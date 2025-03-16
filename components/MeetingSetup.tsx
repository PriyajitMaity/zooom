import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
  const [isMicCamToggle, setIsMicCamToggle] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggle) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggle, call.camera, call.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">SetUp</h1>
      <VideoPreview className="h-[400px] w-[800px] text-center" />
      <div className="flex flex-col mt-12 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input type="checkbox" onChange={(e) => setIsMicCamToggle(e.target.checked)} />
          Join with Mic and Camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="hover:bg-green-500 bg-green-500 px-4 py-2.5 rounded-md cursor-pointer"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
