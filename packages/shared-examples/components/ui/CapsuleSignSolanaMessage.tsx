import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Alert,
  Label,
  Input,
  Toaster,
} from "../core";

interface CapsuleSignSolanaMessageProps {
  isLoading: boolean;
  signature: string;
  walletId: string;
  walletAddress: string;
  userRecoverySecret: string;
  message: string;
  isUserLoggedIn: boolean;
  setMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogout: () => void;
  handleSignMessage: () => void;
}

export const CapsuleSignSolanaMessage: React.FC<
  CapsuleSignSolanaMessageProps
> = ({
  isLoading,
  signature,
  walletId,
  walletAddress,
  userRecoverySecret,
  message,
  isUserLoggedIn,
  setMessage,
  handleLogout,
  handleSignMessage,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">
        Capsule SDK: Solana Signing Tutorial
      </h2>
      <p className="text-sm text-muted-foreground">
        Learn how to use Capsule SDK to send transactions with solana/web3.js.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow overflow-auto flex-col items-start">
      <Alert className="break-words mb-4">
        <strong>Capsule Wallet ID:</strong> {walletId || "Not available"}
      </Alert>
      <Alert className="break-words mb-4">
        <strong>Capsule Wallet Address:</strong>{" "}
        {walletAddress || "Not available"}
      </Alert>
      {userRecoverySecret && (
        <Alert className="break-words mb-4">
          <strong>Capsule Recovery Secret:</strong>{" "}
          {userRecoverySecret || "Not available"}
        </Alert>
      )}
      <Label htmlFor="capsule-message-input" className="block mb-2">
        Message to Sign with Capsule:
      </Label>
      <Input
        id="capsule-message-input"
        name="capsuleMessageToSign"
        value={message}
        onChange={setMessage}
        placeholder="Enter a message to sign using Capsule"
        className="w-full mb-4"
      />
      <Alert className="break-words mb-4">
        {signature ? (
          <>
            <strong>Signature:</strong>
            <p className="text-sm font-mono mt-2">{signature}</p>
          </>
        ) : (
          <>
            <strong>Signature Status:</strong>{" "}
            {isLoading ? "Signing message..." : "No signature generated yet"}
          </>
        )}
      </Alert>
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full sm:w-auto text-sm"
      >
        Logout from Capsule
      </Button>
      <Button
        onClick={handleSignMessage}
        disabled={!message || !isUserLoggedIn || isLoading}
        className="w-full sm:w-auto text-sm"
      >
        {isLoading
          ? "Signing with Capsule..."
          : "Sign Solana message using Capsule"}
      </Button>
    </CardFooter>
    <Toaster />
  </>
);
