import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Label,
  Input,
} from "../core";

interface CapsulePregenWalletProps {
  email: string;
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  pregenerateWallet: () => void;
  onCancel: () => void;
}

export const CapsulePregenWallet: React.FC<CapsulePregenWalletProps> = ({
  email,
  setEmail,
  isLoading,
  pregenerateWallet,
  onCancel,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">
        Capsule SDK: Create a Pre-generated Wallet
      </h2>
      <p className="text-sm text-muted-foreground">
        Learn how to use Capsule Web SDK to create a pre-generated wallet. This
        process allows for wallet creation before user authentication, enhancing
        the onboarding experience.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col items-start">
      <Label htmlFor="capsule-pregen-email-input" className="block mb-2">
        Email for Capsule Pre-generated Wallet:
      </Label>
      <Input
        id="capsule-pregen-email-input"
        placeholder="Enter your email for Capsule wallet"
        value={email}
        onChange={setEmail}
        className="mb-4"
        type="email"
        aria-describedby="capsule-pregen-email-description"
      />
      <p
        id="capsule-pregen-email-description"
        className="text-xs text-muted-foreground"
      >
        Capsule will use this email to associate with your pre-generated wallet.
        You'll authenticate with this email later.
      </p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onCancel}>
        Back to Options
      </Button>
      <Button
        onClick={pregenerateWallet}
        disabled={!email || !email.includes("@") || isLoading}
      >
        {isLoading
          ? "Creating Capsule Wallet..."
          : "Create Capsule Pre-gen Wallet"}
      </Button>
    </CardFooter>
  </>
);
