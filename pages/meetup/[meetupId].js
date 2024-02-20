import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Router, useRouter } from "next/router";
import React from "react";
import { MongoClient, ObjectId } from "mongodb";

export default function MeetupDetails(props) {
 
  return (
    <>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jaydevk:jk@meetup-project.ydormky.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupIds = await meetupCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetupIds.map((m) => ({
      params: { meetupId: m._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://jaydevk:jk@meetup-project.ydormky.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const data = await meetupCollection.findOne({
    _id: new ObjectId(context.params.meetupId),
  });

  return {
    props: {
      meetupData: {
        title: data.title,
        address: data.address,
        id: data._id.toString(),
        image: data.image,
        description:data.description
      },
    },
  };
}
