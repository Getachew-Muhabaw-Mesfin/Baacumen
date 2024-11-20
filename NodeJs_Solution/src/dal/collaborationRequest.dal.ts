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

  /**
   * Search and filter collaboration requests
   * @param options Pagination options
   * @param filters Filters for search and status
   */
  async searchAndFilterCollaborationRequests(
    options: PaginationOptions,
    filters: {
      title?: string;
      description?: string;
      category?: string;
      status?: string;
    }
  ): Promise<PaginatedResult<ICollaborationRequestInstance>> {
    const where: any = {};

    // Validate and construct the filter conditions
    if (filters.title && filters.title.trim() !== "") {
      where.title = { [Op.like]: `%${filters.title}%` };
    }
    if (filters.description && filters.description.trim() !== "") {
      where.description = { [Op.like]: `%${filters.description}%` };
    }
    if (filters.category && filters.category.trim() !== "") {
      where.category = { [Op.eq]: filters.category };
    }
    if (filters.status && filters.status.trim() !== "") {
      where.status = { [Op.eq]: filters.status };
    }

    // Validate pagination options
    const validPage =
      Number.isInteger(options.page) && options.page > 0 ? options.page : 1;
    const validPageSize =
      Number.isInteger(options.pageSize) && options.pageSize > 0
        ? options.pageSize
        : 10;

    const sanitizedOptions = {
      ...options,
      page: validPage,
      pageSize: validPageSize,
    };

    // Call the paginate function with sanitized options and filters
    return await paginate<ICollaborationRequestInstance>(
      CollaborationRequest,
      sanitizedOptions,
      where
    );
  }
}

export default new CollaborationRequestDAL();
