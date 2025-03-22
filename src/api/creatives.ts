import axios from "axios";

export interface Creative {
  creative_id: string;
  image_url: string;
  relevant_metadata: string;
  performance_metrics: string;
  labels: string;
}

interface PaginatedResponse {
  creative_details: Creative[];
  has_more: boolean;
  next_cursor?: number;
}

interface CreativesRequestParams {
  limit: number;
  cursor?: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches paginated creatives from the API.
 * @param {number} limit - The number of creatives to fetch in one request.
 * @param {number} [cursor] - The cursor to continue pagination from.
 * @returns {Promise<PaginatedResponse>} - A promise that resolves to a PaginatedResponse object.
 */
export const fetchCreativesPaginated = async (
  limit: number,
  cursor?: number
): Promise<PaginatedResponse> => {
  const params: CreativesRequestParams = { limit };

  if (cursor) {
    params.cursor = cursor;
  }
  const response = await axios.get(`${BASE_URL}/creatives`, {
    params,
  });
  return response.data;
};
