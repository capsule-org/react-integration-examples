import { Environment } from "@usecapsule/react-sdk";
import Capsule from "@usecapsule/react-sdk";

// Request a free API key at https://usecapsule.com/beta
// The API key can be set as an environment variable or hardcoded
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

// Set the environment development and to production when deploying
const environment = Environment.DEVELOPMENT;

// Create an instance of the Capsule client and export it
export const capsuleClient = new Capsule(environment, CAPSULE_API_KEY);
