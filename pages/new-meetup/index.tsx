import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import { Meetup } from '@/types/meetup';
import { useRouter } from 'next/router';

export default function NewMeetup() {
  const router = useRouter();

  async function onAddMeetup(meetup: Meetup) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetup),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.push('/');
  }
  return <NewMeetupForm onAddMeetup={onAddMeetup} />;
}
