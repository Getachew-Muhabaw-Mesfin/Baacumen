import { Request, Response } from "express";
import Joi from "joi";
import CollaborationRequestDAL from "../dal/collaborationRequest.dal";
import { title } from "process";

class CollaborationRequestController {
  /**
   * Create a new collaboration request
   * Create a new collaboration request with the provided data
   */
  async createCollaborationRequest(req: Request, res: Response) {
    try {
      const _payload = req.body;

      // const schema = Joi.object({
      //   title: Joi.string().required(),
      //   description: Joi.string().required(),
      //   category: Joi.string().required(),
      //   status: Joi.string().required(),
      // });
      const newRequest =
        await CollaborationRequestDAL.createCollaborationRequest(_payload);
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all collaboration requests with pagination
   */
  async getAllCollaborationRequests(req: Request, res: Response) {
    try {
      const { page = 1, pageSize = 10 } = req.query;

      const options = {
        page: parseInt(page as string, 10),
        pageSize: parseInt(pageSize as string, 10),
      };

      const requests =
        await CollaborationRequestDAL.getAllCollaborationRequests(options);
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a specific collaboration request by its ID
   */
  async getCollaborationRequestById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const request = await CollaborationRequestDAL.getCollaborationRequestById(
        Number(id)
      );
      if (request) {
        res.status(200).json(request);
      } else {
        res.status(404).json({ message: "Collaboration request not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update the status of a collaboration request
   */
  async updateCollaborationRequestStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedRequest =
        await CollaborationRequestDAL.updateCollaborationRequestStatus(
          Number(id),
          status
        );
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a collaboration request
   */
  async deleteCollaborationRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await CollaborationRequestDAL.deleteCollaborationRequest(
        Number(id)
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Search and filter collaboration requests
   */
  async searchAndFilterCollaborationRequests(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        category,
        status,
        page = 1,
        pageSize = 10,
      } = req.query;

      const options = {
        page: parseInt(page as string, 10),
        pageSize: parseInt(pageSize as string, 10),
      };

      const filters: Record<string, string> = {};
      if (title) filters.title = title as string;
      if (description) filters.description = description as string;
      if (category) filters.category = category as string;
      if (status) filters.status = status as string;

      const filteredRequests =
        await CollaborationRequestDAL.searchAndFilterCollaborationRequests(
          options,
          filters
        );

      res.status(200).json(filteredRequests);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CollaborationRequestController();
