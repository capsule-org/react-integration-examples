import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Alert,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Label,
  Input,
  Toaster,
} from "../core";

interface CapsuleSignMessagesProps {
  isLoading: boolean;
  signature: string;
  walletId: string;
  walletAddress: string;
  userRecoverySecret: string;
  message: string;
  selectedSigner: string;
  isUserLoggedIn: boolean;
  setSelectedSigner: (value: string) => void;
  setMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogout: () => void;
  handleSignMessage: () => void;
}

export const CapsuleSignMessages: React.FC<CapsuleSignMessagesProps> = ({
  isLoading,
  signature,
  walletId,
  walletAddress,
  userRecoverySecret,
  message,
  selectedSigner,
  isUserLoggedIn,
  setSelectedSigner,
  setMessage,
  handleLogout,
  handleSignMessage,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">
        Capsule SDK: Message Signing Tutorial
      </h2>
      <p className="text-sm text-muted-foreground">
        Learn how to use Capsule SDK to sign messages with various Ethereum
        libraries. This tutorial demonstrates Capsule's integration with popular
        signing libraries.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col items-start">
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
      <Label htmlFor="capsule-signer-select" className="block mb-2">
        Select Capsule-compatible Signer Library:
      </Label>
      <Select onValueChange={setSelectedSigner}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Choose a signer library" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Capsule-compatible Signers</SelectLabel>
            <SelectItem value="ethers-v5-integration">
              Ethers v5 with Capsule
            </SelectItem>
            <SelectItem value="ethers-v6-integration">
              Ethers v6 with Capsule
            </SelectItem>
            <SelectItem value="viem-v1-integration">
              Viem v1 with Capsule
            </SelectItem>
            <SelectItem value="viem-v2-integration">
              Viem v2 with Capsule
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
        <strong>Capsule Signature Status:</strong>{" "}
        {isLoading
          ? "Signing with Capsule..."
          : signature
          ? `Capsule Signature: ${signature}`
          : "No Capsule signature yet"}
      </Alert>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={handleLogout}>
        Logout from Capsule
      </Button>
      <Button
        onClick={handleSignMessage}
        disabled={!message || !selectedSigner || !isUserLoggedIn || isLoading}
      >
        {isLoading ? "Signing with Capsule..." : "Sign Message using Capsule"}
      </Button>
    </CardFooter>
    <Toaster />
  </>
);
