import { Op } from "sequelize";
import CollaborationRequest from "../model/collaborationRequest.model";
import { ICollaborationRequestInstance } from "../types/collaborationRequest";
import {
  paginate,
  PaginationOptions,
  PaginatedResult,
} from "../utils/paginator";

class CollaborationRequestDAL {
  /**
   * Create a new collaboration request
   *
   */
  async createCollaborationRequest(data: ICollaborationRequestInstance) {
    return await CollaborationRequest.create(data);
  }

  /**
   * Get all collaboration requests
   * using pagination options to limit the number of results
   *
   */
  async getAllCollaborationRequests(
    options: PaginationOptions
  ): Promise<PaginatedResult<ICollaborationRequestInstance>> {
    // add search and filter options  here
    return await paginate<ICollaborationRequestInstance>(
      CollaborationRequest,
      options
    );
  }

  /**
   * Get a collaboration request by its ID
   * Get a single collaboration request by its ID
   */
  async getCollaborationRequestById(id: number) {
    return await CollaborationRequest.findByPk(id);
  }

  /**
   * Update the status of a collaboration request
   * Update the status of a collaboration request by its ID
   *
   */
  async updateCollaborationRequestStatus(
    id: number,
    status: "OPEN" | "CLOSED"
  ) {
    const collaborationRequest = await CollaborationRequest.findByPk(id);
    if (collaborationRequest) {
      collaborationRequest.status = status;
      await collaborationRequest.save();
      return collaborationRequest;
    }
    throw new Error("Collaboration request not found");
  }

  /**
   * Delete a collaboration request
   * Delete a collaboration request by its ID
   *
   */
  async deleteCollaborationRequest(id: number) {
    const collaborationRequest = await CollaborationRequest.findByPk(id);
    if (collaborationRequest) {
      await collaborationRequest.destroy();
      return { message: "Request deleted successfully" };
    }
    throw new Error("Collaboration request not found");
  }

  async searchAndFilterCollaborationRequests(
    options: PaginationOptions,
    where: Record<string, string>,
    searchFilters: Record<string, string>
  ): Promise<PaginatedResult<ICollaborationRequestInstance>> {
    const combinedWhere = { ...where, ...searchFilters };

    return await paginate<ICollaborationRequestInstance>(
      CollaborationRequest,
      options,
      combinedWhere
    );
  }
}

export default new CollaborationRequestDAL();
