---
title: "3-Axis Robotic Arm"
description: "Custom three-revolute robotic manipulator with forward/inverse kinematics, built from scratch with stepper motors and 3D-printed links."
date: 2026-08-01
tags: ["python", "robotics", "3d-printing", "kinematics", "stepper-motors"]
github: "DylanCoon99/multi-axis-arm"
status: "in-progress"
---

A custom three-joint robotic arm designed, fabricated, and controlled from scratch. The successor to the camera gimbal project, focused on learning manipulator kinematics and control through hands-on implementation.

The base joint uses a NEMA 17 stepper with belt-driven reduction, the shoulder runs dual MG996R servos in parallel, and the elbow uses a single MG996R. Kinematics are implemented from scratch using NumPy, with PyBullet for simulation validation.
