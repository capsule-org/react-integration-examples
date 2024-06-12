import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Label,
  Input,
} from "../core";

interface AuthenticateProps {
  isLoading: boolean;
  email: string;
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthenticateUser: () => void;
  resetState: () => void;
}

export const Authenticate: React.FC<AuthenticateProps> = ({
  isLoading,
  email,
  setEmail,
  handleAuthenticateUser,
  resetState,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">Authenticate with Capsule SDK</h2>
      <p className="text-sm text-muted-foreground">
        This will use the Capsule Web SDK for manual authentication. If you are
        a new user, a verification code will be sent to your email.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col items-start	">
      <Label htmlFor="email-input" className="block mb-2">
        Your Email:
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
      <Button
        onClick={handleAuthenticateUser}
        disabled={isLoading || !email || !email.includes("@")}
      >
        {isLoading ? "Loading..." : "Continue"}
      </Button>
    </CardFooter>
  </>
);
