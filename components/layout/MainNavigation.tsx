import Link from 'next/link';
import { PropsWithChildren } from 'react';
import classes from './MainNavigation.module.css';

const MainNavigation: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
