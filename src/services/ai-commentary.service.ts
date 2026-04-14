import { MatchEvent, Match } from '@/types/database';

export const AICommentaryService = {
  generateCommentary(match: Match, event: MatchEvent): string {
    const playerName = event.side === 1 ? 'Player A' : 'Player B';
    
    if (event.action === 'smash') {
      return `Incredible power from ${playerName}! A clinical smash finds the corner.`;
    }
    
    if (event.action === 'net') {
      return `Delicate touch! ${playerName} wins the point with a sharp net kill.`;
    }

    if (match.score[0] === 20 || match.score[1] === 20) {
      return `MATCH POINT! The tension is palpable in the stadium.`;
    }

    return `Consistent rally play. ${playerName} forces an error to lead ${match.score[0]}-${match.score[1]}.`;
  }
};