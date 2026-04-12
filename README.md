# AeroSpatial — 3D Air Traffic Visualization Tool

**Built by Mohammed Rashad & Anmol Aggarwal**

[![AeroSpatial Preview](../aerospatial_picture.png)](https://venerable-pastelito-7e0da5.netlify.app/)

*[Try Me](https://venerable-pastelito-7e0da5.netlify.app/)*

---

## The Problem

Air traffic controllers rely on 2D radar displays — flat, top-down maps where every aircraft is a blip on a screen. When two aircraft share the same horizontal position but are separated by altitude, they appear as a single overlapping symbol. Vertical separation, one of the most critical safety margins in aviation, is effectively invisible.

A controller must mentally reconstruct a 3D picture from 2D data, altitude readouts, and years of trained intuition — all in real time, under pressure, with dozens of aircraft in their sector. Cognitive load is high. Fatigue compounds the risk.

**AeroSpatial proposes a different approach:** what if vertical separation were simply *visible*?

### Thought Partners, Not Replacements

ATC is one of the few domains where this question isn't philosophical — it's statutory. The FAA mandates that a certified human controller makes every separation decision. No algorithm, model, or visualization tool is authorized to issue a clearance. The human is the authority by law, and the "not replacement" half of this equation isn't a design choice: it's a constraint of the domain.

That constraint is actually clarifying. It means the entire design space opens up on the other side of it — what does it mean to genuinely *augment* a human who cannot be replaced?

The hard problem in ATC isn't locating aircraft. The radar solves that. The hard problem is that the interface forces controllers to perform real-time 3D spatial reconstruction from a 2D screen, for hours at a stretch, where each mental calculation has to be correct. That's computational work being offloaded onto human cognition — not because controllers are the right tool for it, but because the display never offered an alternative.

AeroSpatial doesn't make decisions. It handles the geometry so the controller can focus on the judgment: sequencing, intent, prioritization, the unexpected. A controller's expertise is in traffic management, not mental trigonometry.

The goal in one line: *we didn't build a tool that thinks for controllers — we built one that lets them stop thinking about the wrong things.*

---

## What It Is

AeroSpatial is a 3D spatial visualization tool for air traffic control scenarios. It renders aircraft as 3D objects in a true spatial environment, making altitude gaps and converging trajectories immediately perceivable — no mental math required.

This is a **cognitive aid and advisory display**, not a replacement for FAA-certified radar systems. It is designed to supplement existing tooling by making dangerous proximity obvious at a glance.

---

## Advisory Display — Not a Primary System

AeroSpatial is explicitly a **supplemental, advisory display**. It is not a certified separation tool and carries no authority over ATC decisions. This distinction is not a legal disclaimer — it is a design principle, and it has direct regulatory and research precedent.

**The regulatory framework is clear.** FAA Order JO 7110.65BB §3-1-9 distinguishes between *Certified Tower Radar Displays* (CTRDs) and uncertified displays, mandating that uncertified displays "must be used only as an aid to assist controllers in visually locating aircraft or in determining their spatial relationship to known geographical points" — not for providing radar separation services. The FAA's own Traffic Information Service (TIS-B) is described in the [Aeronautical Information Manual §4-5-8](https://faraim.org/faa/aim/chapter-4/section-4-5-8.html) as "supplemental, nonessential" and "for situational awareness use only." AeroSpatial occupies the same lane.

**TCAS is the clearest analogy.** The Traffic Collision Avoidance System — mandated on all commercial aircraft — operates on exactly this advisory model. Per the [FAA's TCAS II Introduction](https://www.faa.gov/documentlibrary/media/advisory_circular/tcas%20ii%20v7.1%20intro%20booklet.pdf), Traffic Advisories (TAs) are advisory-only; pilots must not maneuver solely on a TA, and "the controller remains responsible for ATC separation." TCAS coexists with — and never replaces — primary ATC authority. AeroSpatial is designed with the same boundary.

**The research supports supplemental 3D displays.** A 2024 peer-reviewed meta-analysis of 374 ATC workload studies (*[Safety Science](https://www.sciencedirect.com/science/article/pii/S0925753524001358)*, Zamarreño Suárez et al.) establishes that cognitive overload is a direct safety risk for controllers and that visualization tools represent "critical infrastructure for safe air operations." Eurocontrol's own research ([Woodward, 2006](https://www.academia.edu/11303193/Evaluating_Combined_2D_3D_Displays_for_ATC_Proceedings_of_the_Eurocontrol_Innovative_Research_Workshop_2006_)) found that combined 2D/3D displays "enhance situational awareness and improve conflict detection," with controllers particularly valuing 3D presentation for judging vertical distances. NASA Ames built and flight-tested a [3D Cockpit Display of Traffic Information](https://ntrs.nasa.gov/citations/20040041310) as an advisory spatial layer alongside primary systems — the same architectural relationship AeroSpatial targets for controllers.

**In short:** primary radar certifies. Advisory displays illuminate. AeroSpatial is the latter, by design.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Build tool | Vite |
| UI framework | React 19 |
| 3D engine | Three.js |
| React-Three.js bridge | @react-three/fiber |
| 3D utilities | @react-three/drei (OrbitControls, Html, Line, Billboard) |

---

## Features

- **2D / 3D Toggle** — Switch between a traditional top-down radar view and a fully spatial 3D perspective. The same aircraft, the same data — but vertical separation becomes physically visible in 3D.
- **Predictive Leader Lines** — Dashed trajectory lines project each aircraft's path 3 minutes ahead, making converging routes obvious before they become emergencies.
- **Altitude Slice Filter** — A dual-handle range slider filters the display to a selected altitude band, fading out aircraft outside the range and rendering translucent slab planes to define the active airspace layer.
- **Proximity Halos** — Automated conflict detection highlights converging aircraft in red and renders a pulsing translucent cylinder at the projected conflict point, drawing attention to the exact location of risk.
- **Pre-built Scenarios** — Three scripted scenarios (safe parallel approach, crossing converging traffic, runway incursion) let users immediately experience the tool's value without setup.
- **Advisory Banner** — A persistent top-of-screen banner reinforces the tool's role as a supplemental display, ensuring correct regulatory framing for any ATC professional viewing it.

---

## Validated by Air Traffic Controllers

AeroSpatial was reviewed and tested by two active air traffic controllers whose identities cannot be disclosed due to government regulations. Their feedback confirmed the core thesis: vertical separation is significantly faster to assess in the 3D view, and the proximity alert system surfaced conflicts that would have required deliberate cross-referencing in a standard 2D display.

---

## Try It

**[Launch the Visualization Tool](https://venerable-pastelito-7e0da5.netlify.app/)**

---

## Demo Video

Watch the demo on **[YouTube Shorts](https://www.youtube.com/shorts/kp2Guq0PJ8g)**.

---

## Acknowledgements

We extend our sincere gratitude to the two air traffic controllers who gave their time, expertise, and candid feedback to validate this project. Their domain knowledge shaped every design decision, and their willingness to engage with an unconventional idea made this work meaningful. The constraints that prevent us from naming them do nothing to diminish the depth of our appreciation.

Thank you.

---

*AeroSpatial — Augmenting Awareness while offloading cognitive risk and preventing the next near misses.*
