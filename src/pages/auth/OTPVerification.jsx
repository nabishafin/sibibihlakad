import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OTPVerification = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">OTP Verification</CardTitle>
          <CardDescription>
            Enter the OTP sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP</Label>
              <Input id="otp" type="text" placeholder="123456" required />
            </div>

            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Didn't receive the OTP?{" "}
            <Link to="#" className="underline">
              Resend OTP
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;