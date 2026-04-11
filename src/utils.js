// Scale: 1 unit = 1nm horizontal, 1 unit = 1000ft vertical
// Heading: 0 = north (+Z), 90 = east (+X)

export const TYPE_COLORS = {
  arrival:   '#4488ff',
  departure: '#44ff88',
  enroute:   '#ffaa44',
  pattern:   '#44ff88',
};

/**
 * Compute an aircraft's position at elapsedTime seconds from scenario start.
 * Uses real aviation speed scale — a 250kts aircraft moves ~4 units/min.
 */
export function computePosition(aircraft, elapsedTime) {
  const headingRad = (aircraft.heading * Math.PI) / 180;
  const speedPerSec  = aircraft.speed / 3600;          // knots → nm/sec = units/sec
  const climbPerSec  = aircraft.climbRate / 60 / 1000; // ft/min → units/sec

  return [
    aircraft.position[0] + Math.sin(headingRad) * speedPerSec * elapsedTime,
    aircraft.position[1] + climbPerSec * elapsedTime,
    aircraft.position[2] + Math.cos(headingRad) * speedPerSec * elapsedTime,
  ];
}

/**
 * Compute where an aircraft will be in 3 minutes (leader line endpoint).
 */
export function computeLeaderEnd(aircraft, currentPosition) {
  const headingRad  = (aircraft.heading * Math.PI) / 180;
  const dist3min    = (aircraft.speed / 60) * 3;           // nm in 3 minutes = units
  const climb3min   = (aircraft.climbRate / 60) * 3 / 1000; // units in 3 minutes

  return [
    currentPosition[0] + Math.sin(headingRad) * dist3min,
    currentPosition[1] + climb3min,
    currentPosition[2] + Math.cos(headingRad) * dist3min,
  ];
}
