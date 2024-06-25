import React from "react";
import { CardHeader, CardContent, CardFooter, Button } from "../core";
import Google from "../../assets/images/google.svg";
import Twitter from "../../assets/images/x.com.svg";
import Facebook from "../../assets/images/facebook.svg";
import Apple from "../../assets/images/apple.svg";
import Discord from "../../assets/images/discord.svg";
import Farcaster from "../../assets/images/farcaster.svg";
import { OAuthMethod } from "@usecapsule/react-sdk";

interface CapsuleOAuthAuthFormProps {
  isLoading: boolean;
  handleAuthentication: (provider: OAuthMethod) => void;
  onCancel: () => void;
}

const oauthButtons = [
  { method: OAuthMethod.GOOGLE, icon: Google, label: "Sign in with Google" },
  { method: OAuthMethod.TWITTER, icon: Twitter, label: "Sign in with Twitter" },
  { method: OAuthMethod.APPLE, icon: Apple, label: "Sign in with Apple" },
  {
    method: OAuthMethod.FACEBOOK,
    icon: Facebook,
    label: "Sign in with Facebook",
  },
  { method: OAuthMethod.DISCORD, icon: Discord, label: "Sign in with Discord" },
  {
    method: OAuthMethod.FARCASTER,
    icon: Farcaster,
    label: "Sign in with Farcaster",
  },
];

export const CapsuleOAuthAuthForm: React.FC<CapsuleOAuthAuthFormProps> = ({
  isLoading,
  handleAuthentication,
  onCancel,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">Capsule OAuth Authentication</h2>
      <p className="text-sm text-muted-foreground">
        Learn how to implement OAuth-based authentication using the Capsule Web
        SDK. This tutorial demonstrates the process for both new and existing
        users.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow overflow-auto flex-col items-start space-y-4">
      {oauthButtons.map(({ method, icon, label }) => (
        <Button
          key={method}
          onClick={() => handleAuthentication(method)}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2"
        >
          <img src={icon} alt={label} width={24} height={24} />
          <span>{label}</span>
        </Button>
      ))}
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-4">
      <Button
        variant="outline"
        onClick={onCancel}
        className="w-full sm:w-auto text-sm"
      >
        Back to Options
      </Button>
    </CardFooter>
  </>
);
