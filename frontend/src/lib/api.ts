export const API_BASE_URL = 'http://127.0.0.1:5000/api';

export async function fetchHealthStatus(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error('Failed to fetch health status');
  }
  return response.json();
}