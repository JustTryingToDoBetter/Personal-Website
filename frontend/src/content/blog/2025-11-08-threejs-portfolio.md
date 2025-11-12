---
title: "Building a 3D Portfolio with Three.js and Vue"
date: "2025-11-08"
category: "Tutorial"
tags: [Three.js, Vue, WebGL]
emoji: "🌌"
excerpt: "How I built an immersive 3D portfolio using TroisJS and Vue 3 — textures, atmosphere shaders, and performance tips."
---

This post walks through building a 3D portfolio using Three.js (via TroisJS) and Vue 3. We'll cover scene setup, lighting, atmosphere shaders, instanced stars, and performance tips for production.

## Scene Setup

First, we need to set up our basic Three.js scene using TroisJS components in Vue:

```javascript
// Basic TroisJS scene structure
import { Renderer, Camera, Scene, PointLight, AmbientLight } from 'troisjs'

export default {
  components: { Renderer, Camera, Scene, PointLight, AmbientLight },
  setup() {
    const cameraPosition = { x: 0, y: 50, z: 300 }
    return { cameraPosition }
  }
}
```

```vue
<template>
  <Renderer ref="renderer" antialias :orbit-ctrl="{ enableDamping: true }">
    <Camera :position="cameraPosition" />
    <Scene>
      <AmbientLight color="#ffffff" :intensity="0.3" />
      <PointLight color="#ffcc99" :intensity="0.8" :position="{ x: 50, y: 50, z: 50 }" />
    </Scene>
  </Renderer>
</template>
```

## Creating Planetary Bodies

For planets, we use instanced meshes for performance:

```javascript
// Creating a planet with atmosphere shader
const planetGeometry = new THREE.SphereGeometry(radius, 64, 64)
const planetMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uAtmosphere: { value: new THREE.Color(0x4488ff) }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uAtmosphere;
    varying vec3 vNormal;
    
    void main() {
      float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      gl_FragColor = vec4(uAtmosphere, 1.0) * intensity;
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending
})
```

## Starfield with InstancedMesh

For optimal performance with thousands of stars, use `InstancedMesh`:

```javascript
import * as THREE from 'three'

function createStarfield(count = 5000) {
  const geometry = new THREE.SphereGeometry(1, 8, 8)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const stars = new THREE.InstancedMesh(geometry, material, count)
  
  const dummy = new THREE.Object3D()
  const spread = 2000
  
  for (let i = 0; i < count; i++) {
    dummy.position.set(
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread
    )
    dummy.scale.setScalar(Math.random() * 2 + 0.5)
    dummy.updateMatrix()
    stars.setMatrixAt(i, dummy.matrix)
  }
  
  stars.instanceMatrix.needsUpdate = true
  return stars
}
```

## Performance Tips

1. **Use instancing** - For repeated geometries (stars, particles)
2. **Optimize textures** - Compress and resize to appropriate dimensions
3. **Limit draw calls** - Merge static meshes where possible
4. **Frustum culling** - Let Three.js handle off-screen objects
5. **LOD (Level of Detail)** - Use simpler meshes for distant objects

```python
# Example: texture optimization script
from PIL import Image
import os

def optimize_texture(input_path, max_size=1024):
    img = Image.open(input_path)
    img.thumbnail((max_size, max_size), Image.LANCZOS)
    output_path = input_path.replace('.png', '_optimized.png')
    img.save(output_path, optimize=True, quality=85)
    print(f"Optimized: {output_path}")

# Batch process
for file in os.listdir('./textures'):
    if file.endswith('.png'):
        optimize_texture(f'./textures/{file}')
```

## Animation Loop

Finally, add smooth animations in your render loop:

```javascript
const animate = () => {
  requestAnimationFrame(animate)
  
  // Rotate planets
  planets.forEach((planet, i) => {
    planet.rotation.y += 0.001 * (i + 1)
    const angle = Date.now() * 0.0001 * (i + 1)
    const radius = 100 + i * 50
    planet.position.x = Math.cos(angle) * radius
    planet.position.z = Math.sin(angle) * radius
  })
  
  renderer.render(scene, camera)
}

animate()
```

## Conclusion

Building a 3D portfolio is challenging but rewarding. Start simple, optimize early, and iterate on performance. The final result is an immersive experience that stands out.

**Key Takeaways:**
- TroisJS simplifies Three.js integration with Vue
- Shader materials give you full control over rendering
- Instancing is crucial for performance with many objects
- Profile regularly using Chrome DevTools and Three.js stats

Ready to build your own 3D experience? Check out the [TroisJS docs](https://troisjs.github.io/) and start experimenting!
