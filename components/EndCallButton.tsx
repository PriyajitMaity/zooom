"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  if (!call) throw new Error("useStreamCall must be used within a StreamCall component");

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant && call.state.createdBy && localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push("/");
  };

  return (
    <Button onClick={endCall} className="hover:bg-red-500 bg-red-500 cursor-pointer">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
