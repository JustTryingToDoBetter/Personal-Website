---
title: "Building a 3D Portfolio with Three.js and Vue"
date: "2025-11-08"
category: "Tutorial"
tags: [Three.js, Vue, WebGL]
emoji: "🌌"
excerpt: "How I built an immersive 3D portfolio using TroisJS and Vue 3 — textures, atmosphere shaders, and performance tips."
---

This post walks through building a 3D portfolio using Three.js (via TroisJS) and Vue 3. We'll cover scene setup, lighting, atmosphere shaders, instanced stars, and performance tips for production.

## Highlights

- Scene graph organization
- Reusable materials and shader tricks
- InstancedMesh for performant starfields

```js
// Example: simple Three.js sphere in Trois
<Renderer>
  <Camera :position="{ z: 300 }" />
  <Scene>
    <Mesh>
      <SphereGeometry :radius="10" />
      <StandardMaterial :props="{ metalness: 0.1 }" />
    </Mesh>
  </Scene>
</Renderer>
```

## Performance Tips

- Use instancing where possible
- Bake textures and reduce map sizes
- Limit shadow casters to important objects

Read on for the full walkthrough and code snippets.
