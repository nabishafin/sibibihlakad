import React, { useState } from "react";
import {
  Copy,
  CheckCircle2,
  ArrowDownCircle,
  Gift,
  DollarSign,
  Repeat,
} from "lucide-react";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useGetWalletBalanceQuery, useGetTransactionsQuery } from "@/redux/features/wallet/walletApi";
import { useSelector } from "react-redux";
import { Loading } from "@/components/ui/Loading";
import { DepositModal } from "@/components/dashboardcomponents/DepositModal";

const Wallet = () => {
  const [copied, setCopied] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user } = useSelector((state) => state.auth);
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
  const { data: walletData, isLoading: isWalletLoading } = useGetWalletBalanceQuery();
  const { data: transactionData, isLoading: isTransactionsLoading, isFetching: isTransactionsFetching } = useGetTransactionsQuery({
    page: currentPage,
    limit: itemsPerPage
  });

  // Use API data if available, fallback to Redux state
  const profileData = userData?.data || user;

  // Flexible balance detection
  const getBalanceValue = (data) => {
    if (!data) return 0;
    // If it's an object with btc property (as seen in Home.jsx/BalanceCard)
    if (typeof data === 'object' && data.btc !== undefined) return data.btc;
    // If it's a number or string
    if (typeof data === 'number' || typeof data === 'string') return data;
    return 0;
  };

  const balanceSource = walletData?.data?.balance ??
    walletData?.balance ??
    profileData?.balance ??
    profileData?.wallet?.balance ??
    userData?.balance ??
    user?.wallet?.balance;

  const balance = getBalanceValue(balanceSource);

  // Debug: Log detected balance to console if it's still 0
  if (balance === 0 || isNaN(balance)) {
    console.log("Wallet Balance Debug:", {
      walletData,
      userData,
      profileData,
      detectedBalance: balance
    });
  }

  const depositAddress = profileData?.depositAddress || profileData?.walletToken || "tb1qwzdatpfsztq99wlwuanucxnpuah7mppsj25vnr";

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Map the new transaction API response to UI
  const transactions = transactionData?.data?.map((tx) => {
    let icon = Repeat;
    const type = tx.type?.toLowerCase() || "";

    if (type === "deposit") icon = ArrowDownCircle;
    else if (type === "win") icon = Gift;
    else if (type === "bet" || type === "stake") icon = DollarSign;

    return {
      id: tx.id,
      icon,
      title: tx.title,
      time: tx.time,
      amount: tx.amount,
      isPositive: (tx.rawAmount || 0) > 0 || tx.amount?.includes("+")
    };
  }) || [];

  const pagination = transactionData?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isUserLoading || isTransactionsLoading || isWalletLoading) {
    return (
      <div className="bg-[#0e1624] rounded-2xl p-8">
        <Loading size="large" text="Loading wallet..." />
      </div>
    );
  }

  return (
    <div className="bg-[#0e1624] rounded-2xl">
      <div className="p-6 space-y-6">

        {/* ================= BALANCE + GAME STATS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* BALANCE CARD */}
          <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-400">Your Balance</p>
              <button
                onClick={() => setIsDepositModalOpen(true)}
                className="px-4 py-1.5 bg-[#DAA520] hover:bg-[#B8860B] text-black text-sm font-semibold rounded-lg transition-colors"
              >
                Deposit
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">{Number(balance).toFixed(4)}</span>
              <span className="text-xl font-semibold text-[#ffae2c]">BTC</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">≈ $0.00</p>
          </div>

          {/* GAME STATS CARD */}
          <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800 flex justify-around items-center">
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-1">{profileData?.stats?.totalGamesPlayed || 0}</p>
              <p className="text-sm text-gray-400">Game Played</p>
            </div>

            <div className="w-px h-16 bg-gray-700"></div>

            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-1">2</p>
              <p className="text-sm text-gray-400">Game Available</p>
            </div>
          </div>
        </div>

        {/* ================= DEPOSIT ADDRESS SECTION ================= */}
        <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800">
          <h2 className="text-lg font-semibold mb-1 text-white">
            Your Deposit Address
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Send Bitcoin Testnet to this address
          </p>

          {/* QR Code and Address */}
          <div className="flex flex-col items-center gap-6">

            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${depositAddress}`}
                alt="QR Code"
                className="w-32 h-32"
              />
            </div>

            {/* Address Input with Copy Button */}
            <div className="w-full">
              <div className="rounded-lg p-4 flex items-center justify-between bg-[#1a2536] border border-gray-700">
                <span className="text-sm font-mono text-gray-300 mr-3 truncate">
                  {depositAddress}
                </span>

                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${copied
                    ? "bg-green-500 text-white"
                    : "bg-[#ffae2c] text-[#0e1624] hover:bg-[#d6b25e]"
                    }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TRANSACTION HISTORY ================= */}
        <div className="rounded-xl p-6 bg-[#0B121D] border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Transaction History
          </h2>

          <div className="space-y-2 opacity-100 transition-opacity duration-200" style={{ opacity: isTransactionsFetching ? 0.6 : 1 }}>
            {transactions.length > 0 ? (
              transactions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#1a2536] hover:bg-[#1f2a3d] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0e1624]">
                        <Icon size={20} className="text-gray-400" />
                      </div>

                      <div>
                        <p className="font-medium text-white text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>

                    <span
                      className={`font-semibold text-sm ${item.isPositive ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {item.amount}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No transactions found</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isTransactionsFetching}
                  className="px-4 py-2 bg-[#1a2536] text-white rounded-lg text-sm font-medium hover:bg-[#1f2a3d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isTransactionsFetching}
                  className="px-4 py-2 bg-[#ffae2c] text-[#0e1624] rounded-lg text-sm font-bold hover:bg-[#d6b25e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        open={isDepositModalOpen}
        onOpenChange={setIsDepositModalOpen}
      />
    </div>
  );
};

export default Wallet;
