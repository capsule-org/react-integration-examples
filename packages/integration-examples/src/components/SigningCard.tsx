import { Card, CardContent, CardFooter, CardHeader } from "./core/card";
import { Input } from "./core/input";
import { Button } from "./core/button";
import { CapsuleAuthOptions } from "./AuthenticationCard";
import { capsuleClient } from "../clients/capsuleClient";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type SigningCardProps = {
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

export const SigningCard: React.FC<SigningCardProps> = ({
  setIsUserLoggedIn,
}) => {
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    await capsuleClient.logout();
    setIsUserLoggedIn(false);
  };
  return (
    <Card className="max-w-md mx-auto mt-10 bg-white">
      <CardHeader>
        <h2 className="text-xl font-bold">Sign Messages</h2>
      </CardHeader>
      <CardContent>
        <Label>Message:</Label>
        <Input
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <Button
          onClick={() =>
            alert(`
        Signing message: ${message}
        `)
          }
        >
          Sign
        </Button>
      </CardFooter>
    </Card>
  );
};
