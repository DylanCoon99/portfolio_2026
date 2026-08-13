---
title: "Gaze Evaluation Platform"
description: "Evaluation infrastructure for driver-monitoring gaze models with automated regression gating, MLflow tracking, and a Pareto frontier dashboard."
date: 2026-08-01
tags: ["python", "mlflow", "docker", "fastapi", "github-actions", "dvc", "machine-learning"]
github: "DylanCoon99/gaze_detection"
featured: true
---

Evaluation infrastructure for driver-monitoring gaze models: a system that answers **"which model should we ship, and how do we know?"** automatically and repeatedly.

Instead of running a notebook once and eyeballing numbers, every model evaluation is containerized, logged, and compared automatically. Adding a new model requires writing one YAML config file and changing nothing else.

## Core Workflow

1. Define a model in a YAML config (architecture, weights, quantization, runtime)
2. Run the evaluation runner — it loads the model, runs inference on preprocessed face crops, computes metrics, and logs everything to MLflow
3. Open a PR — CI builds the Docker image, runs the eval, and blocks the merge if any metric regresses
4. Compare models in the dashboard — a FastAPI service with an interactive Pareto frontier view

## Metrics

| Category | Metrics |
|---|---|
| Accuracy | MAE (yaw, pitch, combined), p50/p95/p99 angular error |
| Safety | Eyes-off-road false positive rate, false negative rate |
| Latency | Per-batch mean, p50, p95, p99 (ms) |
| Slicing | All accuracy metrics broken out by head-pose bin (0–15°, 15–30°, 30–45°, 45°+) |

Hardware info (device, chip) is logged alongside latency so comparisons are apples-to-apples.

## CI Regression Gate

Every pull request to `main` triggers a GitHub Actions workflow that builds the Docker image, runs evaluation on a test fixture, compares results against a baseline, and fails the build if any metric regresses beyond its tolerance — for example, MAE can't increase by more than 0.5 degrees, FNR can't increase by more than 2%.

## Dashboard

A FastAPI service reads from MLflow and serves an interactive dashboard with a models overview, sortable run history, per-model detail pages, and a Pareto plot comparing any two metrics with Pareto-optimal models highlighted.

## Screenshots

<div class="screenshot-grid">
  <div class="screenshot-card">
    <img src="/sc/models-overview.png" alt="Models Overview — best run per model with key metrics" />
    <p>Models Overview</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/model-detail.png" alt="Model Detail — per-model run history and metric trends" />
    <p>Model Detail</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/pareto-plot.png" alt="Pareto Frontier — accuracy vs latency trade-off plot" />
    <p>Pareto Frontier</p>
  </div>
  <div class="screenshot-card">
    <img src="/sc/all-runs.png" alt="All Runs — every evaluation run with full metrics" />
    <p>All Runs</p>
  </div>
</div>

## Tech Stack

**Language:** Python
**Preprocessing:** MediaPipe BlazeFace detection + crop pipeline
**Tracking:** MLflow
**Data Versioning:** DVC
**Dashboard:** FastAPI, Tailwind CSS, Chart.js
**Infrastructure:** Docker, GitHub Actions

## Links

- [GitHub](https://github.com/DylanCoon99/gaze_detection)
