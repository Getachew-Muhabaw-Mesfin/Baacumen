/**
 * Define the Event interface
 * Event interface is used to define the structure of the event model
 */

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
