import express from "express";
import CollaborationRequestController from "../../controller/collaboration.controller";

const router = express.Router();

/**
 * Create a new collaboration request
 */
router.post("/", CollaborationRequestController.createCollaborationRequest);

/**
 * Get all collaboration requests with pagination
 */
router.get("/", CollaborationRequestController.getAllCollaborationRequests);

/**
 * Get a specific collaboration request by ID
 */
router.get("/:id", CollaborationRequestController.getCollaborationRequestById);

/**
 * Update the status of a collaboration request
 */
router.patch(
  "/:id/status",
  CollaborationRequestController.updateCollaborationRequestStatus
);

/**
 * Delete a collaboration request
 */
router.delete(
  "/:id",
  CollaborationRequestController.deleteCollaborationRequest
);

/**
 * Search and filter collaboration requests
 */
router.get(
  "/search",
  CollaborationRequestController.searchAndFilterCollaborationRequests
);

export default router;
