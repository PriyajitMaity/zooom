import CallList from "@/components/CallList";
import React from "react";

const Provious = () => {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <h1 className="text-3xl">Previous</h1>
      <CallList type="ended" />
    </section>
  );
};

export default Provious;
