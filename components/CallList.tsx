"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return callRecordings;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "Noe previous call";
      case "upcoming":
        return "No upcoming calls";
      case "recordings":
        return "No recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []);

      const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            date={
              (meeting as Call).state?.startedAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : "undefined"}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
