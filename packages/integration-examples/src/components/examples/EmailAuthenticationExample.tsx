import { CardContent, CardFooter, CardHeader } from "../core/card";
import { Input } from "../core/input";
import { Button } from "../core/button";
import { CapsuleAuthOptions } from "../AuthenticationCard";
import { capsuleClient } from "../../clients/capsuleClient";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type EmailAuthenticationExampleProps = {
  email: string;
  setEmail: (email: string) => void;
  setSelectedOption: (option: CapsuleAuthOptions) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  setUserNeedsWallet: (userNeedsWallet: boolean) => void;
};

export const EmailAuthenticationExample: React.FC<
  EmailAuthenticationExampleProps
> = ({
  email,
  setEmail,
  setSelectedOption,
  setIsUserLoggedIn,
  setUserNeedsWallet,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const isExistingUser = await capsuleClient.checkIfUserExists(email);

      if (isExistingUser) {
        const authUrl = await capsuleClient.initiateUserLogin(email);
        window.open(authUrl, "popup", "popup=true,width=400,height=500");
        const { needsWallet } = await capsuleClient.waitForLoginAndSetup();
        setIsUserLoggedIn(true);
        setUserNeedsWallet(needsWallet);
      } else {
        await capsuleClient.createUser(email);
        setSelectedOption("verify-email");
      }
    } catch (err) {
      setError("An error occurred during authentication. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedOption("none");
    setEmail("");
    setIsUserLoggedIn(false);
  };

  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">Web SDK Auth</h2>
      </CardHeader>
      <CardContent>
        <Label htmlFor="email-input" className="block mb-2">
          Your Email:
        </Label>
        <Input
          id="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={isLoading}>
          {isLoading ? "Loading..." : "Continue"}
        </Button>
      </CardFooter>
    </>
  );
};
