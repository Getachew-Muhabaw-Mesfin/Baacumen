import Event from "../models/event.model";
import User from "../models/user.model";
import Rsvp from "../models/rsvp.model";
import { Op } from "sequelize";
import { sendEmail } from "../utils/sendEmail";

export class EventDAL {
  static async createEvent(eventData: any) {
    return await Event.create(eventData);
  }

  static async getEventsByUser(userId: number) {
    return await Event.findAll({
      where: { organizerId: userId },
      include: [
        {
          model: User,
          as: "organizer",
          attributes: ["id", "firstName", "email"],
        },
      ],
    });
  }

  static async getUpcomingEventsForReminders() {
    const now = new Date();
    const upcoming = new Date();
    upcoming.setHours(now.getHours() + 1);

    return await Event.findAll({
      where: {
        date: {
          [Op.between]: [now, upcoming],
        },
      },
      include: [
        {
          model: Rsvp,
          as: "rsvps",
          include: [
            { model: User, as: "user", attributes: ["email", "firstName"] },
          ],
        },
      ],
    });
  }

  static async sendReminderEmail(event: any) {
    for (const rsvp of event.rsvps) {
      const emailContent = `
        Hello ${rsvp.user.firstName},
        This is a reminder for the event "${event.name}" happening at ${event.date}.
        Location: ${event.location}.
      `;

      await sendEmail(rsvp.user.email, "Event Reminder", emailContent);
    }
  }
}
