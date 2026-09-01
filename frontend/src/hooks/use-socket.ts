import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');

let globalSocket: Socket | null = null;

function getSocket(): Socket {
  if (!globalSocket || globalSocket.disconnected) {
    globalSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
  }
  return globalSocket;
}

/**
 * Subscribes to a socket event and cleans up on unmount.
 * Re-uses a single shared socket connection across the app.
 */
export function useSocketEvent(event: string, handler: (data: any) => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const socket = getSocket();
    const fn = (data: any) => handlerRef.current(data);
    socket.on(event, fn);
    return () => { socket.off(event, fn); };
  }, [event]);
}

/**
 * Join a match room and get a leave function.
 */
export function useMatchRoom(matchId: string | undefined) {
  useEffect(() => {
    if (!matchId) return;
    const socket = getSocket();
    socket.emit('match:join', matchId);
    return () => { socket.emit('match:leave', matchId); };
  }, [matchId]);
}

export { getSocket };
