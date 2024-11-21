export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  rows: T[];
  count: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Paginate a query
 * @param model - The model to paginate
 * @param options - Pagination options

 */
export const paginate = async <T>(
  model: any,
  options: PaginationOptions,
  where: any = {}
): Promise<PaginatedResult<T>> => {
  const { page, pageSize } = options;
  const offset = (page - 1) * pageSize;

  const { count, rows } = await model.findAndCountAll({
    where,
    limit: pageSize,
    offset,
  });

  const totalPages = Math.ceil(count / pageSize);

  return {
    rows,
    count,
    totalPages,
    currentPage: page,
  };
};
