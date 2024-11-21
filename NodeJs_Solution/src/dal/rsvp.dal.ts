import Rsvp from "../models/rsvp.model";

export class RSVPTrackingDAL {
  static async upsertRSVP(rsvpData: {
    userId: number;
    eventId: number;
    status: string;
  }) {
    return await Rsvp.upsert(rsvpData);
  }
}
