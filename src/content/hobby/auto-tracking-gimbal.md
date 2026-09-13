---
title: "Auto-Tracking Gimbal"
description: "2-axis motorized camera gimbal that tracks moving objects in real-time using OpenCV and a Raspberry Pi 5."
date: 2026-06-15
tags: ["python", "opencv", "raspberry-pi", "3d-printing", "robotics"]
github: "DylanCoon99/auto_tracking_gimbal"
status: "completed"
---

A 2-axis pan/tilt gimbal that uses computer vision to automatically follow a user-selected target. Built around a Raspberry Pi 5 with a camera module, PCA9685 servo driver, and a 3D-printed housing designed in Fusion 360.

The tracking loop uses OpenCV's CSRT correlation tracker to locate the target each frame, computes normalized error from the frame center, and feeds it into a proportional controller that adjusts the pan and tilt servos to keep the object centered.
