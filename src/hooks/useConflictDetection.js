import { useMemo } from 'react';
import { computeLeaderEnd } from '../utils.js';

export function useConflictDetection(aircraftData, positions, altitudeRange) {
  return useMemo(() => {
    const conflictIds  = new Set();
    const conflictPairs = [];
    const [altMin, altMax] = altitudeRange;

    // Only check aircraft within the active altitude filter
    const activeIndices = aircraftData.reduce((acc, _, i) => {
      if (positions[i][1] >= altMin && positions[i][1] <= altMax) acc.push(i);
      return acc;
    }, []);

    for (let i = 0; i < activeIndices.length - 1; i++) {
      for (let j = i + 1; j < activeIndices.length; j++) {
        const idx1 = activeIndices[i];
        const idx2 = activeIndices[j];
        const a1   = aircraftData[idx1];
        const a2   = aircraftData[idx2];
        const pos1 = positions[idx1];
        const pos2 = positions[idx2];

        // Compare projected (3-minute look-ahead) positions, not current
        const proj1 = computeLeaderEnd(a1, pos1);
        const proj2 = computeLeaderEnd(a2, pos2);

        const dx            = proj1[0] - proj2[0];
        const dz            = proj1[2] - proj2[2];
        const lateralNm     = Math.sqrt(dx * dx + dz * dz); // units = nm
        const verticalUnits = Math.abs(proj1[1] - proj2[1]); // 1 unit = 1000ft

        // FAA minimum separation: < 3nm lateral AND < 1000ft (1 unit) vertical
        if (lateralNm < 3 && verticalUnits < 1) {
          conflictIds.add(a1.id);
          conflictIds.add(a2.id);
          conflictPairs.push({
            id1: a1.id,
            id2: a2.id,
            midpoint: [
              (proj1[0] + proj2[0]) / 2,
              (proj1[1] + proj2[1]) / 2,
              (proj1[2] + proj2[2]) / 2,
            ],
          });
        }
      }
    }

    return { conflictIds, conflictPairs };
  }, [aircraftData, positions, altitudeRange]);
}
