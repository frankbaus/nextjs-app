import { Meetup } from '@/types/meetup';
import { Fragment as section, PropsWithChildren } from 'react';
import styles from './MeetupDetail.module.css';

const MeetupDetail: React.FC<PropsWithChildren<Meetup>> = ({ children, id, title, image, address, description }) => {
  return (
    <section className={styles.detail}>
      <img src={image} alt="Meetup" />
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetail;
