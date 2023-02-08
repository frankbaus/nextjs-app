import MeetupList from '@/components/meetups/MeetupList';
import { Meetups } from '@/types/meetups';
import { MongoClient } from 'mongodb';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment, PropsWithoutRef } from 'react';

const Homepage: React.FC<
  PropsWithoutRef<{
    meetups: Meetups[];
  }>
> = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse a huge list..." />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
};

export default Homepage;

export const getStaticProps: GetStaticProps = async (context) => {
  const uri = 'mongodb+srv://nextjs:TaXR6VhLKXY62xSS@cluster0.zdpsqho.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(uri);

  const meetupsCollection = client.db('meetups').collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: meetupsList,
    },
  };
};*/
