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

interface SignMessageProps {
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

export const SignMessages: React.FC<SignMessageProps> = ({
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
      <h2 className="text-xl font-bold">Sign a Message with Capsule SDK</h2>
      <p className="text-sm text-muted-foreground">
        Use the Capsule SDK to sign a message with a compatible signer library.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col items-start	">
      <Alert className="break-words mb-4 ">
        {walletId ? `Your Wallet ID: ${walletId}` : "No wallet ID"}
      </Alert>
      <Alert className="break-words mb-4 ">
        {walletAddress ? `Your Wallet Address: ${walletAddress}` : "No address"}
      </Alert>
      {userRecoverySecret && (
        <Alert className="break-words mb-4 ">
          {userRecoverySecret
            ? `Recovery Secret: ${userRecoverySecret}`
            : "No recovery secret"}
        </Alert>
      )}
      <Select onValueChange={setSelectedSigner}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select a signer" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Signers</SelectLabel>
            <SelectItem value="ethers-v5-integration">Ethers v5</SelectItem>
            <SelectItem value="ethers-v6-integration">Ethers v6</SelectItem>
            <SelectItem value="viem-v1-integration">Viem v1</SelectItem>
            <SelectItem value="viem-v2-integration">Viem v2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label className="block mb-2">Message To Sign:</Label>
      <Input
        name="messageToSign"
        value={message}
        onChange={setMessage}
        placeholder="Message to sign"
        className="w-full mb-4"
      />
      <Alert className="break-words mb-4 ">
        {isLoading
          ? "Signing..."
          : signature
          ? `Signature: ${signature}`
          : "No signature"}
      </Alert>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
      <Button
        onClick={handleSignMessage}
        disabled={!message || !selectedSigner || !isUserLoggedIn || isLoading}
      >
        {isLoading ? "Signing..." : "Sign Message"}
      </Button>
    </CardFooter>
    <Toaster />
  </>
);
