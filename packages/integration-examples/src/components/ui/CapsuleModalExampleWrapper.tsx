import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Label,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Switch,
} from "../core";
import { HexColorPicker } from "react-colorful";
import { PaletteIcon } from "lucide-react";

interface CapsuleReactModalExampleWrapperProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  foregroundColor: string;
  setForegroundColor: (color: string) => void;
  disableEmailLogin: boolean;
  setDisableEmailLogin: (checked: boolean) => void;
  disablePhoneLogin: boolean;
  setDisablePhoneLogin: (checked: boolean) => void;
  handleModalClose: () => void;
  handleModalOpen: () => void;
  resetState: () => void;
  isCapsuleModalOpen: boolean;
  children: React.ReactNode;
}

export const CapsuleModalExampleWrapper: React.FC<
  CapsuleReactModalExampleWrapperProps
> = ({
  backgroundColor,
  setBackgroundColor,
  foregroundColor,
  setForegroundColor,
  disableEmailLogin,
  setDisableEmailLogin,
  disablePhoneLogin,
  setDisablePhoneLogin,
  handleModalClose,
  handleModalOpen,
  resetState,
  isCapsuleModalOpen,
  children,
}) => (
  <>
    <CardHeader>
      <h2 className="text-xl font-bold">Capsule React Modal Authentication</h2>
      <p className="">
        This will open the Capsule React Modal for authentication.
      </p>
    </CardHeader>
    <CardContent className="flex flex-grow flex-col items-start	">
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
          defaultChecked={disablePhoneLogin}
          checked={disablePhoneLogin}
          onCheckedChange={setDisablePhoneLogin}
        />
      </div>
      {children}
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant={"outline"} onClick={resetState}>
        Back
      </Button>
      <Button onClick={handleModalOpen}>Sign in With Email</Button>
    </CardFooter>
  </>
);
