/**
 * Central API service — replaces all Supabase calls.
 * All data goes through the MongoDB backend.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const getToken = () => localStorage.getItem('authToken');

const headers = (extra: Record<string, string> = {}) => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...headers(), ...(options.headers as Record<string, string> || {}) },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Request failed: ${path}`);
  return data as T;
}

// ── Tournaments ──────────────────────────────────────────────────────────────

export const TournamentAPI = {
  getAll: (status?: string) =>
    request<any[]>(`/tournaments${status ? `?status=${status}` : ''}`),

  getById: (id: string) =>
    request<any>(`/tournaments/${id}`),

  create: (data: { name: string; city: string; start_date: string; slug: string; status?: string; organizer?: string }) =>
    request<any>('/tournaments', { method: 'POST', body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<any>(`/tournaments/${id}`, { method: 'DELETE' }),

  getParticipants: (tournamentId: string) =>
    request<any[]>(`/tournaments/${tournamentId}/participants`),

  addParticipant: (tournamentId: string, data: object) =>
    request<any>(`/tournaments/${tournamentId}/participants`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ── Matches ──────────────────────────────────────────────────────────────────

export const MatchAPI = {
  getAll: (status?: string) =>
    request<any[]>(`/matches${status ? `?status=${status}` : ''}`),

  getById: (id: string) =>
    request<any>(`/matches/${id}`),

  create: (data: object) =>
    request<any>('/matches', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: object) =>
    request<any>(`/matches/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<any>(`/matches/${id}`, { method: 'DELETE' }),
};

// ── Users (Rankings / Social) ────────────────────────────────────────────────

export const UserAPI = {
  getAll: () => request<any[]>('/users'),
  getById: (id: string) => request<any>(`/users/${id}`),
};

// ── Analytics ────────────────────────────────────────────────────────────────

export const AnalyticsAPI = {
  getStats: () =>
    request<{ athletes: number; tourneys: number; participants: number }>('/analytics/stats'),
};
