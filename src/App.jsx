import { useState } from 'react';
import { SCENARIOS } from './data/scenarios.js';
import AirspaceScene from './components/AirspaceScene.jsx';

export default function App() {
  const [cameraMode, setCameraMode]         = useState('3d');
  const [activeScenario, setActiveScenario] = useState(0);
  const [altitudeRange, setAltitudeRange]   = useState([0, 15]); // units: 0=SFC, 15=FL150
  const [resetKey, setResetKey]             = useState(0);
  const [playbackSpeed, setPlaybackSpeed]   = useState(1);
  const [colorKeyOpen, setColorKeyOpen]     = useState(false);
  const [selectedAircraftId, setSelectedAircraftId] = useState(null);

  const aircraftData = SCENARIOS[activeScenario].aircraft;

  function handleScenarioChange(index) {
    setActiveScenario(index);
    setAltitudeRange([0, 15]);
    setPlaybackSpeed(1);
    setSelectedAircraftId(null);
    setResetKey(k => k + 1); // remount AirspaceScene → resets Three.js elapsed time
  }

  function handleResetView() {
    setPlaybackSpeed(1);
    setSelectedAircraftId(null);
    setResetKey(k => k + 1);
  }

  function flLabel(units) {
    return `FL${String(Math.round(units * 10)).padStart(3, '0')}`;
  }

  return (
    <>
      {/* Advisory Banner — always visible, regulatory positioning */}
      <div className="advisory-banner">
        <span>⚠</span>
        ADVISORY DISPLAY — Supplemental visualization only. All separation decisions reference primary radar.
      </div>

      {/* 3D scene fills viewport below banner */}
      <div style={{ position: 'fixed', inset: 0, top: 32 }}>
        <AirspaceScene
          key={resetKey}
          aircraftData={aircraftData}
          cameraMode={cameraMode}
          altitudeRange={altitudeRange}
          playbackSpeed={playbackSpeed}
          selectedAircraftId={selectedAircraftId}
          onSelectAircraft={setSelectedAircraftId}
        />
      </div>

      {/* Controls Panel — top left */}
      <div className="controls-panel">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            className="toggle-btn"
            onClick={() => setCameraMode(m => m === '3d' ? '2d' : '3d')}
          >
            {cameraMode === '3d' ? '3D Spatial View' : '2D Radar View'}
          </button>
          <button className="reset-btn" onClick={handleResetView}>
            Reset View
          </button>
          {selectedAircraftId && (
            <button className="recenter-btn" onClick={() => setSelectedAircraftId(null)}>
              Recenter
            </button>
          )}
        </div>
      </div>

      {/* Playback Controls — top right */}
      <div className="playback-panel glass-card">
        <button
          className={`playback-btn${playbackSpeed === -2 ? ' active' : ''}`}
          onClick={() => setPlaybackSpeed(-2)}
          title="Rewind 2x"
        >&#9194;</button>
        <button
          className="playback-btn play-pause"
          onClick={() => setPlaybackSpeed(s => s === 0 ? 1 : 0)}
          title={playbackSpeed === 0 ? 'Play' : 'Pause'}
        >{playbackSpeed === 0 ? '\u25B6' : '\u23F8'}</button>
        <button
          className={`playback-btn${playbackSpeed === 2 ? ' active' : ''}`}
          onClick={() => setPlaybackSpeed(2)}
          title="Fast forward 2x"
        >&#9193;</button>
      </div>

      {/* Color Key Drawer — right edge */}
      <div className={`color-key-drawer glass-card${colorKeyOpen ? ' open' : ''}`}>
        <button
          className="color-key-tab"
          onClick={() => setColorKeyOpen(o => !o)}
        >{colorKeyOpen ? '\u203A' : '\u2039'} Key</button>
        <div className="color-key-body">
          <h3>Aircraft Types</h3>
          {[
            ['Arrival',   '#4488ff'],
            ['Departure', '#44ff88'],
            ['Enroute',   '#ffaa44'],
            ['Conflict',  '#ff4444'],
          ].map(([label, color]) => (
            <div className="color-key-entry" key={label}>
              <span className="color-dot" style={{ background: color }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Altitude Filter — bottom right */}
      <div className="altitude-panel glass-card">
        <h3>Altitude Filter</h3>
        <div className="altitude-label">{flLabel(altitudeRange[0])} — {flLabel(altitudeRange[1])}</div>
        <div className="range-wrapper">
          <div className="range-track-bg" />
          <input
            type="range"
            min={0} max={15} step={0.5}
            value={altitudeRange[0]}
            onChange={e => {
              const v = parseFloat(e.target.value);
              setAltitudeRange(r => [Math.min(v, r[1] - 0.5), r[1]]);
            }}
          />
          <input
            type="range"
            min={0} max={15} step={0.5}
            value={altitudeRange[1]}
            onChange={e => {
              const v = parseFloat(e.target.value);
              setAltitudeRange(r => [r[0], Math.max(v, r[0] + 0.5)]);
            }}
          />
        </div>
      </div>

      {/* Scenario Panel — bottom left */}
      <div className="scenario-panel glass-card">
        <h3>Scenarios</h3>
        {SCENARIOS.map((scenario, i) => (
          <button
            key={i}
            className={`scenario-btn${activeScenario === i ? ' active' : ''}`}
            onClick={() => handleScenarioChange(i)}
          >
            {scenario.name}
          </button>
        ))}
      </div>
    </>
  );
}
