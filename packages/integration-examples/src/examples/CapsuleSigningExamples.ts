import type Capsule from "@usecapsule/web-sdk";

// Ethers v5 and v6
import { CapsuleEthersSigner as CapsuleEthersV6Signer } from "@usecapsule/ethers-v6-integration";
import { CapsuleEthersV5Signer } from "@usecapsule/ethers-v5-integration";

// Viem v1
import {
  createCapsuleViemClient as createCapsuleViemClientV1,
  createCapsuleAccount as createCapsuleViemAccountV1,
} from "@usecapsule/viem-v1-integration";
import {
  WalletClientConfig as WalletClientConfigViemV1,
  http as httpViemV1,
} from "viem-v1";
import { sepolia as sepoliaViemV1 } from "viem-v1/chains";

// Viem v2
import {
  createCapsuleViemClient as createCapsuleViemClientV2,
  createCapsuleAccount as createCapsuleViemAccountV2,
} from "@usecapsule/viem-v2-integration";
import {
  WalletClientConfig as WalletClientConfigViemV2,
  http as httpViemV2,
} from "viem";
import { sepolia as sepoliaViemV2 } from "viem/chains";

// solana/web3.js
import { CapsuleSolanaWeb3Signer } from '@usecapsule/solana-web3.js-v1-integration';
import * as solana from '@solana/web3.js';

// Solana specific variables
const SOLANA_DEVNET_RPC_ENDPOINT = 'https://api.devnet.solana.com';

const signWithEthersV5 = async (
  capsule: Capsule,
  message: string
): Promise<string> => {
  if (!capsule) {
    throw new Error("Capsule not instantiated");
  }
  try {
    const ethersSigner = new CapsuleEthersV5Signer(capsule);
    return await ethersSigner.signMessage(message);
  } catch (error) {
    throw new Error(`Error signing message with signer: ethers-v5, ${error}`);
  }
};

const signWithEthersV6 = async (
  capsule: Capsule,
  message: string
): Promise<string> => {
  if (!capsule) {
    throw new Error("Capsule not instantiated");
  }
  try {
    const ethersSigner = new CapsuleEthersV6Signer(capsule);
    return await ethersSigner.signMessage(message);
  } catch (error) {
    throw new Error(`Error signing message with signer: ethers-v6, ${error}`);
  }
};

const signWithViemV1 = async (
  capsule: Capsule,
  message: string
): Promise<string> => {
  if (!capsule) {
    throw new Error("Capsule not instantiated");
  }
  try {
    const walletClientConfig: WalletClientConfigViemV1 = {
      chain: sepoliaViemV1,
      transport: httpViemV1(process.env.NEXT_PUBLIC_RPC_URL),
    };
    const viemClient = createCapsuleViemClientV1(capsule, walletClientConfig);

    return await viemClient.signMessage({
      account: createCapsuleViemAccountV1(capsule),
      message: message,
    });
  } catch (error) {
    throw new Error(`Error signing message with signer: viem-v1, ${error}`);
  }
};

const signWithViemV2 = async (
  capsule: Capsule,
  message: string
): Promise<string> => {
  if (!capsule) {
    throw new Error("Capsule not instantiated");
  }
  try {
    const walletClientConfig: WalletClientConfigViemV2 = {
      chain: sepoliaViemV2,
      transport: httpViemV2(process.env.NEXT_PUBLIC_RPC_URL),
    };
    const viemClient = createCapsuleViemClientV2(capsule, walletClientConfig);

    return await viemClient.signMessage({
      account: createCapsuleViemAccountV2(capsule),
      message: message,
    });
  } catch (error) {
    throw new Error(`Error signing message with signer: viem-v2, ${error}`);
  }
};

export const signMessage = async (
  capsule: Capsule,
  selectedSigner: string,
  message: string
): Promise<string> => {
  switch (selectedSigner) {
    case "ethers-v5-integration":
      return await signWithEthersV5(capsule, message);
    case "ethers-v6-integration":
      return await signWithEthersV6(capsule, message);
    case "viem-v1-integration":
      return await signWithViemV1(capsule, message);
    case "viem-v2-integration":
      return await signWithViemV2(capsule, message);
    default:
      throw new Error(
        "Invalid signer. Please select a valid signer to sign the message."
      );
  }
};

export const sendSolanaTransaction = async (
  capsule: Capsule,
  solToSend: string,
  solanaRecipientAddress: string,
): Promise<string> => {
  const solToSendNumber = Number(solToSend);
  if (!solToSendNumber) {
    throw new Error(`Sol to send must be a non-zero number, received: ${solToSend}`);
  }
  const connection = new solana.Connection(SOLANA_DEVNET_RPC_ENDPOINT, 'confirmed');
  const solanaSigner = new CapsuleSolanaWeb3Signer(capsule, connection);
  const tx = new solana.Transaction().add(
    solana.SystemProgram.transfer({
      fromPubkey: solanaSigner.sender!,
      toPubkey: new solana.PublicKey(solanaRecipientAddress),
      lamports: solToSendNumber * solana.LAMPORTS_PER_SOL, // Convert SOL to lamports
    }),
  );
  tx.feePayer = solanaSigner.sender;

  return solanaSigner.sendTransaction(tx, {
    skipPreflight: false,
    preflightCommitment: 'confirmed',
  });
}
