import { useMemo } from 'react';
export function useConflictDetection() {
  return useMemo(() => ({ conflictIds: new Set(), conflictPairs: [] }), []);
}
