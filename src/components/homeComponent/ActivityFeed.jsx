import React from "react";
import { Link } from "react-router-dom";

export const ActivityFeed = ({ activities = [] }) => {
  // Ensure we have a valid array
  const feedData = Array.isArray(activities) ? activities : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-5">
        <h2 className="text-white text-lg font-medium">Live Activity</h2>
        <Link
          to="/dashboard/activity"
          className="text-[#DAA520] text-sm hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-3 h-[400px] overflow-y-auto pr-2">
        {feedData.map((activity) => {
          // Helper to determine icon and style based on activity
          let Icon = BitcoinIcon;
          if (activity.description.toLowerCase().includes("scratch")) Icon = ScratchCardIcon;
          else if (activity.description.toLowerCase().includes("spin")) Icon = SpinWheelIcon;

          // Format time if needed. Assuming timestamp comes as ISO string. 
          // Simple formatter:
          const time = new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div
              key={activity.id}
              className="bg-[#0e1624] rounded-lg p-4 flex items-center justify-between hover:bg-[#1a2235] transition-colors"
            >
              <div className="flex items-center">
                <div className="mr-4 bg-[#141b34] p-2 rounded-lg">
                  <Icon />
                </div>
                <div>
                  <h3 className="text-white font-medium">{activity.description}</h3>
                  <p className="text-gray-400 text-xs">{time}</p>
                </div>
              </div>
              <div
                className={`font-medium ${activity.isPositive ? "text-[#16a34a]" : "text-[#f34f4f]"
                  }`}
              >
                {activity.amount} {activity.currency}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
const BitcoinIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#ffae2c" />
    <path
      d="M15.5 10.5C15.5 8.84 14.16 7.5 12.5 7.5H9V13.5H12.5C14.16 13.5 15.5 12.16 15.5 10.5Z"
      fill="#0e1624"
    />
    <path
      d="M9 15V16.5H11V18H13V16.5H14V15H13V6H11V7.5H9V9H11V15H9Z"
      fill="#0e1624"
    />
  </svg>
);
const ScratchCardIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="#141b34" />
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="2"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M9 9L15 15M15 9L9 15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const SpinWheelIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="#141b34" />
    <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2" />
    <path
      d="M12 5V7M12 17V19M5 12H7M17 12H19M7.5 7.5L9 9M16.5 16.5L15 15M16.5 7.5L15 9M7.5 16.5L9 15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
