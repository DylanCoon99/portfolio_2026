---
title: "Gridplan: Graph-Search Planner Benchmark"
description: "Hybrid C++20/Python library implementing BFS, Dijkstra, A*, and weighted A* on 2D and 3D occupancy grids, with pybind11 bindings and a full benchmarking suite."
date: 2026-10-10
tags: ["c++", "python", "pybind11", "algorithms", "robotics", "benchmarking"]
image: "/sc/gridplan/comparison.png"
github: "DylanCoon99/autonomy_planning"
featured: true
---

A hybrid C++20/Python path-planning library implementing BFS, Dijkstra, A*, and weighted A* on 2D and 3D occupancy grids. It's the first piece of a drone autonomy project track, providing the search foundation for later trajectory generation and incremental replanning work.

The search runs in a C++ core exposed to Python through pybind11 bindings that accept NumPy arrays and release the GIL during search. A pure-Python reference implementation of every planner serves as a correctness oracle. C++ and Python results are cross-validated in tests, and the core is checked under AddressSanitizer and UBSan.

## Architecture

- **C++ core**: flat-array grid with padded borders, precomputed neighbor offset/cost tables, and planners with configurable heuristics and tie-breaking
- **pybind11 bindings**: expose every planner to Python with NumPy input and the GIL released during search
- **Python layer**: environment generation, reference planners, 2D/3D visualization, and the benchmark sweep and analysis

## Design Decisions

- **Flat `std::vector<uint8_t>` with padded borders**: eliminates bounds checks in the inner loop. Neighbors are found by adding precomputed offsets to linear indices.
- **Runtime-parameterized dimensions**: one `Grid` class handles both 2D and 3D instead of templating on dimension, at the cost of one negligible branch.
- **Lazy-deletion priority queue for Dijkstra, closed set for A\***: the stale-entry check doesn't hold once f-values include a heuristic, so A* tracks a closed set instead.
- **Corner-cutting constraints in the neighbor table**: each diagonal entry carries the component offsets that must be free, checked at neighbor-generation time.

## Results

- **A\* vs Dijkstra**: on open 8-connected grids with the octile heuristic, A* expands ~200 nodes vs ~50,000 for Dijkstra. The gap narrows on cluttered grids, where obstacles force detours the heuristic can't predict.
- **Weighted A\***: at w=5.0, paths are only ~1.1–1.15x optimal, far below the theoretical 5x bound, while running ~100x faster than BFS/Dijkstra on 1024² grids.
- **Tie-breaking**: preferring larger g on equal f cuts expansions on open 4-connected grids from ~20,000 to ~500.
- **C++ vs Python**: the C++ core is 11–28x faster than the Python reference, and binding overhead drops below 5% on 1024² grids.
- **2D vs 3D**: a 64³ grid (~260k cells) takes time comparable to a 1024² grid (~1M cells). That cubic scaling is why onboard drone planners favor sparser representations like octrees over dense voxel grids.

## Screenshots

<div class="screenshot-grid">
  <div class="screenshot-card">
    <img src="/sc/gridplan/comparison.png" alt="BFS, Dijkstra, A*, and weighted A* paths and expanded nodes on a 64x64 grid" />
    <p>Planner Comparison (64×64)</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/gridplan/viz3d_path.png" alt="A* path through a 16x16x16 voxel grid" />
    <p>3D A* Path</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/gridplan/expansion_reduction.png" alt="A* vs Dijkstra node expansions by obstacle density" />
    <p>A* Expansion Reduction</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/gridplan/tiebreaking.png" alt="Effect of tie-breaking on A* expansions" />
    <p>Tie-Breaking Effect</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/gridplan/weighted_suboptimality.png" alt="Weighted A* empirical suboptimality vs weight" />
    <p>Weighted A* Suboptimality</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/gridplan/cpp_vs_python_speedup.png" alt="C++ vs Python reference planner speedup" />
    <p>C++ vs Python Speedup</p>
  </div>
</div>

## Tech Stack

**Core:** C++20, CMake
**Bindings:** pybind11, NumPy
**Python:** pytest, Matplotlib
**Testing & Profiling:** GoogleTest, Google Benchmark, AddressSanitizer/UBSan, Instruments

## Links

- [GitHub](https://github.com/DylanCoon99/autonomy_planning)
