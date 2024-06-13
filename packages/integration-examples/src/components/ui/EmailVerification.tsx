import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Label,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../core";

interface EmailVerificationProps {
  isLoading: boolean;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  handleVerifyEmail: () => void;
  resetState: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  isLoading,
  verificationCode,
  setVerificationCode,
  handleVerifyEmail,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">
        Verify Email Address with Capsule SDK
      </h2>
      <p className="text-sm text-muted-foreground">
        A verification code was sent to your email. Please enter the code to
        verify your email address and complete the registration process.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col items-start	">
      <Label htmlFor="verification-code-input" className="block mb-2">
        Verification Code:
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
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Back</Button>
      <Button onClick={handleVerifyEmail} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </CardFooter>
  </>
);
