import Link from 'next/link';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';


function MeetupItem(meetup) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={meetup.image} alt={meetup.title} />
        </div>
        <div className={classes.content}>
          <h3>{meetup.title}</h3>
          <address>{meetup.address}</address>
        </div>
        <div className={classes.actions}>
          <Link href={`/meetup/${meetup.id}`}><button>Show Details</button></Link>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
