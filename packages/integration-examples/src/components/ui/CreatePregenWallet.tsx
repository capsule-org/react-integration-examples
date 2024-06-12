import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Label,
  Input,
} from "../core";

interface CreatePreGeneratedWalletProps {
  email: string;
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  pregenerateWallet: () => void;
  resetState: () => void;
}

export const CreatePreGeneratedWallet: React.FC<
  CreatePreGeneratedWalletProps
> = ({ email, setEmail, isLoading, pregenerateWallet, resetState }) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">Create a Pre-generated Wallet</h2>
      <p>
        Use the Capsule Web SDK for manual authentication to create a
        pre-generated wallet.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col items-start	">
      <Label htmlFor="email-input" className="block mb-2">
        Enter Your Email:
      </Label>
      <Input
        id="email-input"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        className="mb-4"
      />
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={resetState}>
        Back
      </Button>
      <Button onClick={pregenerateWallet} disabled={!email || isLoading}>
        {isLoading ? "Loading..." : "Continue"}
      </Button>
    </CardFooter>
  </>
);
