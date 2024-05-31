import { web3Onboard } from "../../clients/web3Onboard";
import { CapsuleAuthOptions } from "../AuthenticationCard";
import { Button } from "../core/button";
import { CardHeader, CardContent, CardFooter } from "../core/card";
type Web3OnboardAuthenticationExampleProps = {
  setSelectedOption: (option: CapsuleAuthOptions) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

export const Web3OnboardAuthenticationExample: React.FC<
  Web3OnboardAuthenticationExampleProps
> = ({ setSelectedOption, setIsUserLoggedIn }) => {
  const handleBack = () => {
    setSelectedOption("none");
  };
  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-bold">
          BlockNative Web3-Onboard Capsule Authentication
        </h2>
        <p className="">
          This will open the BlockNative Modal with Capsule as a wallet option.
        </p>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"outline"} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={() => web3Onboard.connectWallet()}>
          Connect Wallet
        </Button>
      </CardFooter>
    </>
  );
};
