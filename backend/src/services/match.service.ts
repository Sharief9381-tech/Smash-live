"use client";

import { supabase } from '@/lib/supabase';
import { Match } from '@/types/database';

export const MatchService = {
  async createMatch(matchData: any) {
    const { data, error } = await supabase
      .from('matches')
      .insert([{
        name: matchData.name,
        match_type: matchData.matchType,
        players: matchData.players,
        status: 'live',
        current_score: [0, 0],
        sets_won: [0, 0],
        serving: 1
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateScore(matchId: string, score: [number, number], sets: [number, number], serving: number) {
    const { data, error } = await supabase
      .from('matches')
      .update({
        current_score: score,
        sets_won: sets,
        serving: serving,
        last_update: new Date().toISOString()
      })
      .eq('id', matchId);

    if (error) throw error;
    return data;
  },

  async getLiveMatches() {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('status', 'live')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Subscribe to real-time updates for a specific match
  subscribeToMatch(matchId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`match_${matchId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'matches', 
        filter: `id=eq.${matchId}` 
      }, callback)
      .subscribe();
  }
};