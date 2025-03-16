"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker';
import Loader from "./Loader";
import { Input } from "./ui/input";

const initialValue = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState(initialValue);
  const [callDetail, setCallDetail] = useState<Call>();

  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if(!client || !user) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("failed to create meeting");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      toast.success("Meeting has been created.");

      if (!values.dateTime) {
        toast.warning("Please select date & time");
      }

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.log("client meeting", error);
      toast.error("Failed to create Meeting");
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink =`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        className="bg-[#0E78F9]"
        description="Via invitation link to join meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        className="bg-[#830EF9]"
        description="Plan your meeting meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        className="bg-[#F9A90E]"
        description="Start an instant meeting"
        handleClick={() => router.push("/recordings")}
      />

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-[#ECF0FF]">Add a description</label>
            <Textarea
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#252A41]"
              onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
          </div>
          <div className ="flex w-full flex-col gap-2.5">
            <label className="">Select Date and Time</label>
            <ReactDatePicker
              className="w-full rounded bg-[#252a41] p-2 focus:outline-none"
              selected={values.dateTime}
              onChange={(date) =>setValues({...values, dateTime: date!})}
              
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.info("link copied");
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}
       <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-[#252a41] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
