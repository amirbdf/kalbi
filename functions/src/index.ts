import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const myFunction = onRequest((request, response) => {
  logger.info("Request received"); // Log a message using logger
  response.send("Hello from Firebase!"); // Send a response
});
