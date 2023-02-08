import MeetupDetail from '@/components/meetups/MeetupDetail';
import { Meetup } from '@/types/meetup';
import { MongoClient, ObjectId } from 'mongodb';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment, PropsWithChildren } from 'react';

const MeetupDetailView: React.FC<PropsWithChildren<{ meetup: Meetup }>> = ({ children, meetup }) => {
  return (
    <Fragment>
      <Head>
        <title>Showing Meetup {meetup.title}</title>
        <meta name="description" content="meetup" />
      </Head>
      <MeetupDetail
        id={meetup.id}
        title={meetup.title}
        image={meetup.image}
        address={meetup.address}
        description={meetup.description}
      />
    </Fragment>
  );
};

export default MeetupDetailView;

export const getStaticPaths: GetStaticPaths = async () => {
  const uri = 'mongodb+srv://nextjs:TaXR6VhLKXY62xSS@cluster0.zdpsqho.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(uri);

  const meetupsCollection = client.db('meetups').collection('meetups');

  const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const meetupId = context.params?.meetupId;

  const uri = 'mongodb+srv://nextjs:TaXR6VhLKXY62xSS@cluster0.zdpsqho.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(uri);

  const meetupsCollection = client.db('meetups').collection('meetups');

  const id = new ObjectId(meetupId as string);
  const meetupData = await meetupsCollection.findOne({ _id: id });

  const meetup = {
    id: id.toString(),
    title: meetupData!.title,
    image: meetupData!.image,
    address: meetupData!.address,
    description: meetupData!.description,
  };

  console.log(meetup);

  client.close();
  return {
    props: {
      meetup,
    },
    revalidate: 10,
  };
};
