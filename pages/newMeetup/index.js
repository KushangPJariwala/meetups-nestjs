import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import React from "react";

export default function NewMeetup() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/addMeetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    router.push("/");
  }
  return (
    <div>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
}
