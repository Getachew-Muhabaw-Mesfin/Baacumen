// src/routes/event.routes.ts
import express from "express";
import { EventController } from "../../controller/event.controller";
import isAuthenticated from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
const router = express.Router();
const authenticate = isAuthenticated as any;
router.post(
  "/",

  authenticate,
  // authorize(["admin"], ["create:event"]) as any,
  EventController.createEvent as any
);
router.get(
  "/",
  authenticate,
  // authorize(["admin"], ["read:event"]) as any,
  EventController.getCalendarEvents
);
router.post(
  "/rsvp",
  authenticate,
  // authorize(["admin", "user"], ["create:rsvp"]) as any,
  EventController.manageRSVP
);

export default router;
