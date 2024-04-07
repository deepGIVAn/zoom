"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupCompleted,
}: {
  setIsSetupCompleted: (type: boolean) => void;
}) => {
  const [isMicCamToogledOn, setIsMicCamToogledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("Use Call must be within StreamCall Component");
  }

  useEffect(() => {
    if (isMicCamToogledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToogledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToogledOn}
            onChange={(e) => setIsMicCamToogledOn(e.target.checked)}
          />
          Join with Mic and Camera Off{" "}
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-blue-1 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupCompleted(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
