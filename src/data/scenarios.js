export const SCENARIOS = [
  {
    name: "Parallel approach — safe separation",
    aircraft: [
      { id: "DAL482", position: [-8, 6, -15], heading: 180, speed: 180, climbRate: -700, altitude: 6000, type: "arrival" },
      { id: "UAL917", position: [-5, 4, -12], heading: 180, speed: 170, climbRate: -700, altitude: 4000, type: "arrival" },
      { id: "SWA331", position: [10, 10, 5],  heading: 270, speed: 300, climbRate: 0,    altitude: 10000, type: "enroute" },
      { id: "AAL108", position: [15, 12, -8], heading: 225, speed: 320, climbRate: 0,    altitude: 12000, type: "enroute" },
      { id: "N742SP", position: [3, 2.5, 8],  heading: 90,  speed: 120, climbRate: 500,  altitude: 2500,  type: "departure" },
      { id: "JBU455", position: [-12, 8, 3],  heading: 160, speed: 210, climbRate: -500, altitude: 8000,  type: "arrival" },
    ],
  },
  {
    name: "Crossing traffic — converging altitudes",
    aircraft: [
      { id: "SWA1423", position: [-10, 7, 0],  heading: 90,  speed: 280, climbRate: -300, altitude: 7000,  type: "arrival" },
      { id: "FDX892",  position: [0, 6.5, -10], heading: 180, speed: 290, climbRate: 0,    altitude: 6500,  type: "enroute" },
      { id: "UAL204",  position: [8, 5, 12],    heading: 200, speed: 250, climbRate: -500, altitude: 5000,  type: "arrival" },
      { id: "DAL661",  position: [-15, 11, -5], heading: 135, speed: 310, climbRate: 0,    altitude: 11000, type: "enroute" },
      { id: "N518QS",  position: [5, 3, -6],    heading: 350, speed: 180, climbRate: 1000, altitude: 3000,  type: "departure" },
      { id: "AAL773",  position: [-3, 9, 8],    heading: 240, speed: 270, climbRate: -200, altitude: 9000,  type: "arrival" },
    ],
  },
  {
    name: "Runway incursion — same runway",
    aircraft: [
      { id: "SWA2491", position: [0, 1.5, -3],   heading: 180, speed: 140, climbRate: -700, altitude: 1500,  type: "arrival" },
      { id: "UAL558",  position: [0, 0.1, 2],    heading: 180, speed: 0,   climbRate: 0,    altitude: 100,   type: "departure" },
      { id: "AAL334",  position: [6, 4, -8],      heading: 180, speed: 190, climbRate: -700, altitude: 4000,  type: "arrival" },
      { id: "N912GA",  position: [-4, 2, 5],      heading: 270, speed: 110, climbRate: 0,    altitude: 2000,  type: "pattern" },
      { id: "JBU711",  position: [12, 8, 0],      heading: 210, speed: 260, climbRate: -400, altitude: 8000,  type: "arrival" },
      { id: "FDX107",  position: [-8, 10, -12],   heading: 170, speed: 300, climbRate: -300, altitude: 10000, type: "enroute" },
    ],
  },
];
