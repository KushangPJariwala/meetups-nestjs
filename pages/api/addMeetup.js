import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("data", data);

    const client = await MongoClient.connect(
      "mongodb+srv://jaydevk:jk@meetup-project.ydormky.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log("result", result);

    client.close();

    res.status(201).json({ msg: "stored" });
  }
}

export default handler;
