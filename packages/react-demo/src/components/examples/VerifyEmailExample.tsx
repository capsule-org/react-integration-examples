import { CardContent, CardFooter } from "../core/card";
import { Button } from "../core/button";
import { capsuleClient } from "../../clients/capsuleClient";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../core/input-otp";
import { Label } from "../core/label";

type VerifyEmailExampleProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  setUserRecoverySecret: (recoverySecret: string) => void;
};

export const VerifyEmailExample: React.FC<VerifyEmailExampleProps> = ({
  setIsUserLoggedIn,
  setUserRecoverySecret,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = await capsuleClient.verifyEmail(verificationCode);
      window.open(url, "popup", "popup=true,width=400,height=500");

      const recoverySecret =
        await capsuleClient.waitForPasskeyAndCreateWallet();

      setIsUserLoggedIn(true);
      setUserRecoverySecret(recoverySecret);
    } catch (err) {
      setError(
        "An error occurred during email verification. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardContent>
        <Label htmlFor="verification-code-input" className="block mb-2">
          Enter Verification Code
        </Label>
        <InputOTP
          id="verification-code-input"
          name="verificationCode"
          maxLength={6}
          value={verificationCode}
          onChange={setVerificationCode}
          textAlign="center"
          className="mb-4"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button onClick={handleVerifyEmail} disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </CardFooter>
    </>
  );
};
