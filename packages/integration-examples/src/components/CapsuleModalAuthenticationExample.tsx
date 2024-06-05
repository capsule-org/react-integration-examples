import Capsule, {
  CapsuleModal,
  ConstructorOpts,
  Environment,
  OAuthMethod,
} from "@usecapsule/react-sdk-dev"; //Note this is an alias for @usecapsule/react-sdk to prevent conflicts with web3-onboard using an older version of the Capsule SDK
import { useEffect, useState } from "react";
import "@usecapsule/react-sdk-dev/styles.css";
import Logo from "../assets/images/capsule-logo.svg";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { PaletteIcon } from "lucide-react";
import { CapsuleAuthOptions } from "..";
import { useToast } from "./core/toast/use-toast";
import { CardContent, CardFooter, CardHeader } from "./core/card";
import { Button } from "./core/button";
import { Label } from "./core/label";
import { Switch } from "./core/switch";
import { Input } from "./core/input";

// This component demonstrates how to use the Capsule Modal for a managed authentication flow.
// For additional details on the Capsule SDK, refer to: https://docs.usecapsule.com/

type CapsuleModalAuthenticationExampleProps = {
  setSelectedAuthOption: (option: CapsuleAuthOptions) => void;
};

// 1. Get your API key from https://usecapsule.com/beta
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// 2. Set the environment to development or production based on your use case
const CAPSULE_ENVIRONMENT = Environment.DEVELOPMENT;

// 3. Initialize the Capsule client. Add possible constructor parameters as needed. For more details on the full constructor options, refer to: https://docs.usecapsule.com/integration-guide/customize-capsule#constructor-options
const constructorOpts: ConstructorOpts = {
  emailPrimaryColor: "#ff6700",
  githubUrl: "https://github.com/capsule-org",
  linkedinUrl: "https://www.linkedin.com/company/usecapsule/",
  xUrl: "https://x.com/usecapsule",
  homepageUrl: "https://usecapsule.com/",
  supportUrl: "https://usecapsule.com/talk-to-us",
};
export const capsuleClient = new Capsule(
  CAPSULE_ENVIRONMENT,
  CAPSULE_API_KEY,
  constructorOpts
);

export const CapsuleModalAuthenticationExample: React.FC<
  CapsuleModalAuthenticationExampleProps
> = ({ setSelectedAuthOption }) => {
  const { toast } = useToast();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // These states are used to customize the Capsule Modal and are passed as props to the CapsuleModal component. You can pass these as props directly to the CapsuleModal component or from your apps theme settings. For more details on the Capsule customization options, refer to: https://docs.usecapsule.com/integration-guide/customize-capsule
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [foregroundColor, setForegroundColor] = useState<string>("#ff6700");
  const [disableEmailLogin, setDisableEmailLogin] = useState<boolean>(false);
  const [disablePhoneLogin, setDisablePhoneLogin] = useState<boolean>(false);

  //4. Check if the user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await capsuleClient.isFullyLoggedIn();
        setIsUserLoggedIn(isLoggedIn);
        isLoggedIn &&
          toast({
            title: "Already Logged In",
            description: "You can now proceed with the transaction",
          });
      } catch (err) {
        console.error(err);
      }
    };
    checkLoginStatus();
  }, []);

  // 5. Open the Capsule Modal by simply setting the isCapsuleModalOpen state to true
  const handleModalOpen = () => {
    setIsCapsuleModalOpen(true);
  };

  // 6.  Handle signing a messages or transaction using a Capsule compatible library like ethers.js or viem.js. Additional signing details can be found at: https://docs.usecapsule.com/integration-guide/signing-transactions
  const handleSignMessage = async () => {};

  // 7. As a last step, handle the logout. This will clear the session and the user will have to login again. For additional details on session management, refer to: https://docs.usecapsule.com/integration-guide/session-management
  const handleLogout = async () => {
    await capsuleClient.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    resetState();
  };

  // Handle any cleanup or trigger any app specific actions after the Capsule Modal is closed
  const handleModalClose = async () => {
    setIsCapsuleModalOpen(false);
    if (await capsuleClient.isFullyLoggedIn()) {
      setIsUserLoggedIn(true);
    }
  };

  const resetState = () => {
    setMessage("");
    setBackgroundColor("#ffffff");
    setForegroundColor("#ff6700");
    setDisableEmailLogin(false);
    setDisablePhoneLogin(false);
    isCapsuleModalOpen && setIsCapsuleModalOpen(false);
    setSelectedAuthOption("none");
  };

  const CapsuleModalComponent = () => (
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
            <Button
              variant={"outline"}
              className="mb-4"
              style={{
                backgroundColor: backgroundColor,
              }}
            >
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
            <Button
              variant={"outline"}
              className="mb-4"
              style={{
                backgroundColor: foregroundColor,
              }}
            >
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
            Disable Email Login
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
            Disable Phone Login
          </Label>
          <Switch
            id="disablePhoneLogin"
            defaultChecked={disableEmailLogin}
            checked={disablePhoneLogin}
            onCheckedChange={setDisablePhoneLogin}
          />
        </div>
        <CapsuleModal
          logo={Logo}
          theme={{
            // Customize the Capsule Modal theme based on your app's theme settings
            backgroundColor,
            foregroundColor,
            oAuthLogoVariant: "dark",
          }}
          capsule={capsuleClient}
          isOpen={isCapsuleModalOpen}
          onClose={handleModalClose} // Triggered if user closes the Capsule Modal or after the user is logged in successfully.
          appName="Capsule Modal Demo" // Add your app name. This appears in the Capsule Modal
          oAuthMethods={[
            // Enable the OAuth methods you want to use
            OAuthMethod.GOOGLE,
            OAuthMethod.TWITTER,
            OAuthMethod.FACEBOOK,
            OAuthMethod.DISCORD,
            OAuthMethod.APPLE,
          ]}
          disableEmailLogin={disableEmailLogin} // Disable email login as an option
          disablePhoneLogin={disablePhoneLogin} // Disable phone login as an option
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={resetState}>
          Back
        </Button>
        <Button
          onClick={handleModalOpen} // Open the Capsule Modal
        >
          Sign in With Email
        </Button>
      </CardFooter>
    </>
  );

  const LoggedInComponent = () => (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">Sign A Message</h2>
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
    </>
  );

  return isUserLoggedIn ? <LoggedInComponent /> : <CapsuleModalComponent />;
};
