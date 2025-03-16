"use client";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Table = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-[#C9DDFF] lg:text-xl xl:min-w-32">{title} :</h1>
      <h1 className="italic tracking-wide text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;
    const newCall = client.call("default", meetingId!);
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <h1 className="text-3xl">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description="Meeting's room" />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
        <div className="flex gap-5">
          <Button className="bg-[#0E78F9] cursor-pointer" onClick={startRoom}>
            Start Meeting
          </Button>
          <Button
            className="bg-[#252A41] cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast.info("Link copied");
            }}
          >
            Copy Invitation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalRoom;
