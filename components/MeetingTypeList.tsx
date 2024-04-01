"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meeting, setMeeting] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {},
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        className="bg-orange-1"
        img={"/icons/add-meeting.svg"}
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeeting("isInstantMeeting")}
      />
      <HomeCard
        className="bg-blue-1"
        img={"/icons/schedule.svg"}
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeeting("isScheduleMeeting")}
      />
      <HomeCard
        className="bg-purple-1"
        img={"/icons/recordings.svg"}
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => setMeeting("isJoiningMeeting")}
      />
      <HomeCard
        className="bg-yellow-1"
        img={"/icons/join-meeting.svg"}
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeeting("isJoiningMeeting")}
      />
      <MeetingModal
        isOpen={meeting === "isInstantMeeting"}
        onClose={() => setMeeting(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
