const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Trains the OLS model with the provided data points.
 * @param {Array<{x: number, y: number}>} points - Array of data points
 * @returns {Promise<{slope: number, intercept: number}>} - The trained model parameters
 */
export const trainModel = async (points) => {
  // Transform points from {x, y} format to [x, y] tuples as expected by the backend
  const data = points.map((point) => [point.x, point.y]);

  const response = await fetch(`${API_BASE_URL}/train`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default {
  trainModel,
};
