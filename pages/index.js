import Layout from "@/components/layout/Layout";
import MeetupList from "@/components/meetups/MeetupList";
import React from "react";
import { MongoClient } from "mongodb";

const dummy_meetups = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Suratgrowth.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
];
export default function Home(props) {
  return (
    <div>
      <MeetupList meetups={props.meetups} />
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jaydevk:jk@meetup-project.ydormky.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((m) => ({
        title: m.title,
        address: m.address,
        id: m._id.toString(),
        image: m.image,
      })),
    },
  };
}
