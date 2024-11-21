import { Request, Response } from "express";
import { EventDAL } from "../dal/event.dal";
import Joi from "joi";
import { RSVPTrackingDAL } from "../dal/rsvp.dal";

export class EventController {
  static async createEvent(req: Request, res: Response) {
    try {
      const _user = (req as any).user;
      const userId = _user.id;
      //   const { name, description, date, location, capacity } = req.body;
      const _payload = req.body;
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.date().required(),
        location: Joi.string().required(),
        capacity: Joi.number().required(),
      });

      const { error } = schema.validate(_payload);
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

      const event = await EventDAL.createEvent({
        ..._payload,
        organizerId: userId,
      });

      res.status(201).json({ success: 200, data: event });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getCalendarEvents(req: Request, res: Response) {
    try {
      const _user = (req as any).user;
      const userId = _user.id;
      const events = await EventDAL.getEventsByUser(userId);

      res.status(200).json({ success: true, data: events });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async manageRSVP(req: Request, res: Response) {
    try {
      const _user = (req as any).user;
      const userId = _user.id;
      const { eventId, status } = req.body;

      const rsvp = await RSVPTrackingDAL.upsertRSVP({
        userId,
        eventId,
        status,
      });

      res.status(200).json({ success: true, data: rsvp });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // 4. Send event reminders
  static async sendEventReminders(req: Request, res: Response) {
    try {
      const reminders = await EventDAL.getUpcomingEventsForReminders();
      for (const reminder of reminders) {
        await EventDAL.sendReminderEmail(reminder);
      }

      res.status(200).json({ success: true, message: "Reminders sent!" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
