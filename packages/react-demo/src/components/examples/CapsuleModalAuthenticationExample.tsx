import { CapsuleModal, OAuthMethod } from "@usecapsule/react-sdk";
import { capsuleClient } from "../../clients/capsuleClient";
import { Button } from "../core/button";
import { useState } from "react";
import "@usecapsule/react-sdk/styles.css";
import Logo from "../../assets/images/capsule-logo.png";
import { HexColorPicker } from "react-colorful";
import { CardContent, CardFooter, CardHeader } from "../core/card";
import { CapsuleAuthOptions } from "../AuthenticationCard";
import { Label } from "../core/label";
import { Popover, PopoverTrigger } from "../core/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import { Switch } from "../core/switch";

type CapsuleModalAuthenticationExampleProps = {
  setSelectedOption: (option: CapsuleAuthOptions) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

export const CapsuleModalAuthenticationExample: React.FC<
  CapsuleModalAuthenticationExampleProps
> = ({ setSelectedOption, setIsUserLoggedIn }) => {
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [foregroundColor, setForegroundColor] = useState<string>("#ff6700");
  const [disableEmailLogin, setDisableEmailLogin] = useState<boolean>(false);
  const [disablePhoneLogin, setDisablePhoneLogin] = useState<boolean>(false);

  const handleModalClose = async () => {
    setIsCapsuleModalOpen(false);
    if (await capsuleClient.isFullyLoggedIn()) {
      setIsUserLoggedIn(true);
    }
  };

  const handleBack = () => {
    setSelectedOption("none");
    setBackgroundColor("#ffffff");
    setForegroundColor("#ff6700");
    isCapsuleModalOpen && setIsCapsuleModalOpen(false);
  };
  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">
          Capsule React Modal Authentication
        </h2>
        <p className="">
          This will open the Capsule React Modal for authentication.
        </p>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger>
            <Button variant={"outline"} className="mb-4">
              <PaletteIcon className="mr-2 h-4 w-4" />
              <span>Set Modal Background Color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <HexColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button variant={"outline"} className="mb-4">
              <PaletteIcon className="mr-2 h-4 w-4" />
              <span>Set Modal Foreground Color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <HexColorPicker
              color={foregroundColor}
              onChange={setForegroundColor}
            />
            ;
          </PopoverContent>
        </Popover>
        <div className="flex space-x-2 justify-between mb-2">
          <Label htmlFor="disableEmailLogin" className="text-base">
            Disable Phone Login
          </Label>
          <Switch
            id="disableEmailLogin"
            defaultChecked={disableEmailLogin}
            checked={disableEmailLogin}
            onCheckedChange={setDisableEmailLogin}
          />
        </div>
        <div className="flex space-x-2 justify-between">
          <Label htmlFor="disablePhoneLogin" className=" text-base">
            Disable Email Login
          </Label>
          <Switch
            id="disablePhoneLogin"
            defaultChecked={disableEmailLogin}
            checked={disablePhoneLogin}
            onCheckedChange={setDisablePhoneLogin}
          />
        </div>
        <CapsuleModal
          theme={{
            // Customize the Capsule Modal theme
            backgroundColor,
            foregroundColor,
            oAuthLogoVariant: "dark",
          }}
          capsule={capsuleClient}
          isOpen={isCapsuleModalOpen}
          onClose={handleModalClose}
          appName="Capsule Modal Demo" // Add your app name
          oAuthMethods={[
            // Enable the OAuth methods you want to use
            OAuthMethod.GOOGLE,
            OAuthMethod.TWITTER,
            OAuthMethod.FACEBOOK,
            OAuthMethod.DISCORD,
            OAuthMethod.APPLE,
          ]}
          logo={Logo} // Add your app logo
          disableEmailLogin={disableEmailLogin}
          disablePhoneLogin={disablePhoneLogin}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={() => setIsCapsuleModalOpen(true)}>
          Sign in With Email
        </Button>
      </CardFooter>
    </>
  );
};
