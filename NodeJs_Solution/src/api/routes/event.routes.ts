// src/routes/event.routes.ts
import express from "express";
import { EventController } from "../../controller/event.controller";
import isAuthenticated from "../../middleware/authenticate";
const router = express.Router();
const authenticate = isAuthenticated as any;
router.post("/", authenticate, EventController.createEvent as any);
router.get("/", authenticate, EventController.getCalendarEvents);
router.post("/rsvp", authenticate, EventController.manageRSVP);
router.post("/reminders", authenticate, EventController.sendEventReminders);

export default router;
