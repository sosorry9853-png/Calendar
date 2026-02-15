// This file is no longer used as Voice Interface has been removed.
// Keeping an empty export to satisfy any potential bundler resolution.
export function useLiveSession() {
  return { 
      connect: async () => {}, 
      disconnect: () => {}, 
      status: 'disconnected', 
      volume: 0 
  };
}