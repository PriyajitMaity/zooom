"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("user is not logged in ");
  if (!STREAM_API_KEY) throw new Error("No stream api key");
  if (!STREAM_SECRET_KEY) throw new Error("No stream secret key");

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_SECRET_KEY);

  const expTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.generateUserToken({
     user_id: user.id, validity_in_seconds: expTime, iat: issuedAt 
    });
  return token;
};
