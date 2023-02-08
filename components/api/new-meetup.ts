import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('/api/new-meetup');
  if (req.method === 'POST') {
    const data = req.body;
    const uri = 'mongodb+srv://nextjs:TaXR6VhLKXY62xSS@cluster0.zdpsqho.mongodb.net/?retryWrites=true&w=majority';
    const client = await MongoClient.connect(uri);

    const meetupsCollection = client.db('meetups').collection('meetups');
    console.log(`data to insert ${data}`);
    const result = await meetupsCollection.insertOne(data);

    console.log(`result from inser ${result}`);

    res.status(201).json({ message: 'meetup inserted' });
    client.close();
  }
}

export default handler;
