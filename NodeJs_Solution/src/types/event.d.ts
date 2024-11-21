export interface IEvent {
  id: number;
  name: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  organizerId: number;
  organizer?: IUser;
  rsvps?: IRsvp[];
}
