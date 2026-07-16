---
title: "Real-Time Object Detection Pipeline"
description: "Self-hosted real-time video analytics system running YOLOv8 inference in C++ on a Raspberry Pi 5, with Kafka streaming, a FastAPI backend, and a React dashboard."
date: 2026-07-01
tags: ["c++", "python", "typescript", "yolov8", "kafka", "react", "docker", "raspberry-pi"]
github: "DylanCoon99/realtime-detection-pipeline"
featured: true
---

A self-hosted real-time video analytics system running on a Raspberry Pi 5 (8GB). Runs YOLOv8 inference in C++ via ONNX Runtime, streams detection events through Apache Kafka, processes data with Python batch aggregation, and serves a live dashboard via React.

## Architecture

The system is split into five services that communicate through Kafka and shared data stores:

| Service | Language | Description |
|---------|----------|-------------|
| `capture-inference` | C++ | Captures webcam frames via OpenCV, runs YOLOv8 inference via ONNX Runtime, publishes detection events to Kafka, serves annotated frames via MJPEG stream |
| `stream-processor` | C++ | Kafka consumer that aggregates detections in real-time using sliding window, writes hot data to Redis |
| `batch-processor` | Python | Consumes detection events from Kafka, writes to PostgreSQL, runs scheduled hourly aggregation and cleanup |
| `api` | Python (FastAPI) | REST API serving real-time data from Redis and historical data from PostgreSQL |
| `frontend` | React/TypeScript | Live video feed via MJPEG, real-time detection charts, historical data queries with date range picker |

## Data Flow

`capture-inference` produces two independent outputs:

- **Annotated frames** are served directly as an MJPEG stream — the frontend displays these via a simple `<img>` tag with no WebSocket or API proxy needed.
- **Detection events** (small JSON: timestamp, class, confidence, bbox coordinates) flow through Kafka to two consumers:
  - **stream-processor** aggregates in real-time (sliding window counts, recent events) and writes to Redis
  - **batch-processor** writes every event to PostgreSQL and runs scheduled hourly aggregation

The API reads from both Redis (real-time) and PostgreSQL (historical) to serve the frontend. These paths are independent — if Kafka lags, video still plays. If the video stream drops, charts still update.

## Infrastructure

The full stack runs in Docker Compose with Apache Kafka for event streaming, PostgreSQL for historical storage, Redis for real-time caching, Caddy as a reverse proxy with automatic SSL, and Prometheus/Grafana for monitoring and alerting. CI/CD is handled by GitHub Actions, which builds ARM64 Docker images on push to `main`, pushes to GitHub Container Registry, and triggers a deploy via webhook to the Pi.

## Tech Stack

**Languages:** C++17, Python, TypeScript
**ML:** YOLOv8, ONNX Runtime
**Streaming:** Apache Kafka (librdkafka)
**Backend:** FastAPI
**Frontend:** React, TypeScript
**Databases:** PostgreSQL, Redis
**Infrastructure:** Docker, Docker Compose, GitHub Actions, Prometheus, Grafana, Caddy
**Build:** CMake, Google Test

## Links

- [GitHub](https://github.com/DylanCoon99/realtime-detection-pipeline)
