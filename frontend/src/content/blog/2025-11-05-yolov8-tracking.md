---
title: "Football Player Tracking with YOLOv8: A Deep Dive"
date: "2025-11-05"
category: "AI/ML"
tags: [YOLOv8, Computer Vision]
emoji: "⚽"
excerpt: "A technical deep-dive into building a player tracking pipeline with YOLOv8, DeepSORT, and performance tuning."
---

This article covers my approach to building a football player tracking system: dataset collection, annotation, training YOLOv8, and integrating tracking algorithms. It includes results, lessons learned, and code snippets.

```python
# detection example
results = model.predict(frame, conf=0.4)
```
