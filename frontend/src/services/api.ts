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

  create: (data: object) =>
    request<any>('/tournaments', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: object) =>
    request<any>(`/tournaments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<any>(`/tournaments/${id}`, { method: 'DELETE' }),

  getParticipants: (id: string) =>
    request<any[]>(`/tournaments/${id}/participants`),

  addParticipant: (id: string, data: object) =>
    request<any>(`/tournaments/${id}/participants`, { method: 'POST', body: JSON.stringify(data) }),

  generateDraw: (id: string) =>
    request<any>(`/tournaments/${id}/draw`, { method: 'POST' }),

  getBracket: (id: string) =>
    request<any[]>(`/tournaments/${id}/bracket`),

  recordResult: (id: string, bracketMatchId: string, winnerParticipantId: string) =>
    request<any>(`/tournaments/${id}/result`, {
      method: 'POST',
      body: JSON.stringify({ bracketMatchId, winnerParticipantId }),
    }),

  getMatches: (id: string) =>
    request<any[]>(`/tournaments/${id}/matches`),

  getStandings: (id: string) =>
    request<any[]>(`/tournaments/${id}/standings`),

  closeRegistration: (id: string) =>
    request<any>(`/tournaments/${id}/close-registration`, { method: 'POST' }),
};

// ── Matches ──────────────────────────────────────────────────────────────────

export const MatchAPI = {
  getAll: (status?: string) =>
    request<any[]>(`/matches${status ? `?status=${status}` : ''}`),

  getById: (id: string) =>
    request<any>(`/matches/${id}`),

  create: (data: object) =>
    request<any>('/matches', { method: 'POST', body: JSON.stringify(data) }),

  /** Transition match from scheduled → live */
  start: (id: string) =>
    request<any>(`/matches/${id}/start`, { method: 'POST' }),

  /**
   * Award a point — backend applies badminton rules.
   * Returns { match, gameCompleted, matchCompleted }
   */
  scorePoint: (id: string, side: 1 | 2, action = 'point') =>
    request<{ match: any; gameCompleted: boolean; matchCompleted: boolean }>(
      `/matches/${id}/score`,
      { method: 'POST', body: JSON.stringify({ side, action }) }
    ),

  /** Undo the last point */
  undo: (id: string) =>
    request<any>(`/matches/${id}/undo`, { method: 'POST' }),

  /** Manually end a match */
  end: (id: string) =>
    request<any>(`/matches/${id}/end`, { method: 'POST' }),

  delete: (id: string) =>
    request<any>(`/matches/${id}`, { method: 'DELETE' }),
};

// ── Users (Rankings / Social) ────────────────────────────────────────────────

export const UserAPI = {
  getAll: () => request<any[]>('/users'),
  getById: (id: string) => request<any>(`/users/${id}`),
  getStats: (id: string) => request<any>(`/users/${id}/stats`),
  getRankings: (scope: 'world' | 'state' = 'world', state?: string) =>
    request<any[]>(`/users/rankings?scope=${scope}${state ? `&state=${encodeURIComponent(state)}` : ''}`),
};

// ── Analytics ────────────────────────────────────────────────────────────────

export const AnalyticsAPI = {
  getStats: () =>
    request<{ athletes: number; tourneys: number; participants: number }>('/analytics/stats'),
};
