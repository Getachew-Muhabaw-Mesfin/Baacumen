import { Request, Response } from "express";
import CollaborationRequestDAL from "../dal/collaborationRequest.dal";

class CollaborationRequestController {
  /**
   * Create a new collaboration request
   * Create a new collaboration request with the provided data
   */
  async createCollaborationRequest(req: Request, res: Response) {
    try {
      console.log(
        "-----------------Creating a new collaboration request-----------------"
      );
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
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all collaboration requests with pagination
   */
  async getAllCollaborationRequests(req: Request, res: Response) {
    try {
      console.log(
        "-----------------Getting all collaboration requests-----------------"
      );
      const { page = 1, pageSize = 10 } = req.query;

      const options = {
        page: parseInt(page as string, 10),
        pageSize: parseInt(pageSize as string, 10),
      };

      const requests =
        await CollaborationRequestDAL.getAllCollaborationRequests(options);
      res.status(200).json(requests);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a specific collaboration request by its ID
   */
  async getCollaborationRequestById(req: Request, res: Response) {
    try {
      console.log(
        "-----------------Getting collaboration request by ID-----------------"
      );
      const { id } = req.params;
      const request = await CollaborationRequestDAL.getCollaborationRequestById(
        Number(id)
      );
      if (request) {
        res.status(200).json(request);
      } else {
        res.status(404).json({ message: "Collaboration request not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update the status of a collaboration request
   */
  async updateCollaborationRequestStatus(req: Request, res: Response) {
    try {
      console.log(
        "-----------------Updating collaboration request status-----------------"
      );
      const { id } = req.params;
      const { status } = req.body;

      const updatedRequest =
        await CollaborationRequestDAL.updateCollaborationRequestStatus(
          Number(id),
          status
        );
      res.status(200).json(updatedRequest);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a collaboration request
   */
  async deleteCollaborationRequest(req: Request, res: Response) {
    try {
      console.log(
        "-----------------Deleting collaboration request-----------------"
      );
      const { id } = req.params;

      const response = await CollaborationRequestDAL.deleteCollaborationRequest(
        Number(id)
      );
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Search and filter collaboration requests
   */
  async searchAndFilterCollaborationRequests(req: Request, res: Response) {
    try {
      console.log(
        "--------------------Filtering collaboration requests-----------------"
      );
      const {
        title,
        description,
        category,
        status,
        page = "1",
        pageSize = "10",
      } = req.query;

      const options = {
        page: parseInt(page as string, 10) || 1,
        pageSize: parseInt(pageSize as string, 10) || 10,
      };

      const where: Record<string, string> = {};

      const searchFilters: Record<string, string> = {};
      if (title) searchFilters.title = title as string;
      if (description) searchFilters.description = description as string;
      if (category) searchFilters.category = category as string;
      if (status) searchFilters.status = status as string;

      const filteredRequests =
        await CollaborationRequestDAL.searchAndFilterCollaborationRequests(
          options,
          where,
          searchFilters
        );

      res.status(200).json(filteredRequests);
    } catch (error: any) {
      console.log("Error: ", error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CollaborationRequestController();
