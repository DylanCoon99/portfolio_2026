---
title: "LogicForge"
description: "Desktop application for designing and simulating digital logic circuits, built with C++ and Qt."
date: 2026-05-01
tags: ["c++", "qt", "simulation", "desktop"]
github: "DylanCoon99/LogicForge"
featured: true
---

A desktop application for designing and simulating digital logic circuits. Built for engineers, students, and hobbyists who want to prototype and verify digital designs before breadboarding.

LogicForge focuses on logic correctness — it simulates gate-level behavior, signal propagation, and sequential logic without modeling electrical characteristics.

## Features

- **Component library** — logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR), flip-flops (D, SR, JK, T), latches, registers, counters, multiplexers, demultiplexers, and bus splitters/joiners
- **Simulation engine** — iterative settling for combinational logic, edge detection for sequential components, oscillation detection, and real-time color-coded wire states
- **Custom components** — encapsulate any sub-circuit as a reusable block with named I/O
- **IC import** — generate component files from IC datasheets using an LLM, with pre-built 74LS series components included
- **Truth table generator** — automatically enumerates all input combinations and displays outputs
- **Timing diagram** — dockable panel that records and displays signal waveforms over time
- **Image export** — PNG and SVG export of circuit diagrams

Built with Qt 5.15 and C++17. All components render as classical IEEE schematic symbols.

## Links

- [GitHub](https://github.com/DylanCoon99/LogicForge)
