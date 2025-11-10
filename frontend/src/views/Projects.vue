<template>
  <div
    ref="containerRef"
    class="relative w-screen min-h-screen overflow-hidden text-white"
  >
    <Renderer
      ref="renderer"
      antialias
      :orbit-ctrl="orbitOptions"
      resize="window"
      shadow
      :physically-correct-lights="true"
      :tone-mapping="ACESFilmicToneMapping"
      :exposure="exposure"
      class="absolute inset-0 z-0"
    >
      <Camera :position="{ z: 350 }" :fov="75" :near="0.1" :far="2000" />
  <Scene background="#000000">
        <!-- Lighting -->
        <AmbientLight :intensity="0.25" />
        <HemisphereLight color="#88aaff" ground-color="#111018" :intensity="0.15" />
        <DirectionalLight
          :position="{ x: 200, y: 150, z: 100 }"
          :intensity="1.2"
          cast-shadow
          :shadow-map-size="{ width: 2048, height: 2048 }"
          :shadow-camera-far="1000"
          :shadow-radius="2"
        />
        <PointLight
          ref="sun"
          :position="{ x: 0, y: 0, z: 0 }"
          color="#FFDDBB"
          :intensity="2.5"
          cast-shadow
          :shadow-map-size="{ width: 2048, height: 2048 }"
        />

        <!-- Central Sun Mesh (bright emissive to drive bloom) -->
        <Sphere :scale="{ x: 12, y: 12, z: 12 }">
          <StandardMaterial :props="{ emissive: '#FFE7C8', emissiveIntensity: 6.0, color: '#FFF2D9' }" />
        </Sphere>

        <!-- Project Planets -->
        <Group>
          <Group
            v-for="(project, index) in projects"
            :key="project.id"
            ref="planetOrbits"
            :rotation="{ y: Math.random() * Math.PI * 2 }"
          >
            <Mesh
              :position="{ x: getOrbitRadius(index), y: 0, z: 0 }"
              @pointer-enter="(e) => handlePlanetHover(e, project)"
              @pointer-leave="handlePlanetLeave"
              @click="() => handlePlanetClick(project, index)"
              receive-shadow
              cast-shadow
              :scale="getHoverScale(project)"
            >
              <SphereGeometry :radius="getPlanetSize(index)" />
              <StandardMaterial :props="getPlanetMaterialProps(project, index)">
                <Texture :src="project.texture" />
              </StandardMaterial>
            </Mesh>
            <!-- Atmosphere -->
            <Mesh :position="{ x: getOrbitRadius(index), y: 0, z: 0 }">
              <SphereGeometry :radius="getPlanetSize(index) + 0.5" />
              <ShaderMaterial
                :props="{
                  uniforms: {
                    glowColor: { value: new Color(getPlanetColor(index)) },
                    intensity: { value: getAtmosphereIntensity(project) },
                  },
                  vertexShader: `
                    varying vec3 vNormal;
                    void main() {
                      vNormal = normalize(normalMatrix * normal);
                      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                  `,
                  fragmentShader: `
                    uniform vec3 glowColor;
                    uniform float intensity;
                    varying vec3 vNormal;
                    void main() {
                      float i = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0) * intensity;
                      gl_FragColor = vec4(glowColor, 1.0) * i;
                    }
                  `,
                  blending: 2, // AdditiveBlending
                  transparent: true,
                  depthWrite: false,
                }"
              />
            </Mesh>

            <!-- Optional clouds layer for Earth-like (index 0) -->
            <Mesh v-if="index === 0" :position="{ x: getOrbitRadius(index), y: 0, z: 0 }">
              <SphereGeometry :radius="getPlanetSize(index) + 0.2" />
              <StandardMaterial :props="{ transparent: true, opacity: 0.95 }">
                <Texture src="https://threejs.org/examples/textures/planets/earth_clouds_2048.png" />
              </StandardMaterial>
            </Mesh>
          </Group>
        </Group>

        <!-- Multi-layer Stars with Parallax Depth -->
        <InstancedMesh
          ref="stars"
          :count="1000"
          :position="{ x: 0, y: 0, z: -500 }"
        >
          <SphereGeometry :radius="0.3" />
          <BasicMaterial color="white" />
        </InstancedMesh>

        <!-- Mid-layer Stars (brighter, closer) -->
        <InstancedMesh
          ref="starsMid"
          :count="500"
          :position="{ x: 0, y: 0, z: -300 }"
        >
          <SphereGeometry :radius="0.6" />
          <BasicMaterial color="#aaccff" :props="{ opacity: 0.7, transparent: true }" />
        </InstancedMesh>

        <!-- Near Stars (brightest) -->
        <InstancedMesh
          ref="starsNear"
          :count="200"
          :position="{ x: 0, y: 0, z: -100 }"
        >
          <SphereGeometry :radius="0.9" />
          <BasicMaterial color="#ffffff" :props="{ opacity: 0.9, transparent: true }" />
        </InstancedMesh>

        <!-- Nebula Particle System (Purple/Pink/Cyan clouds) -->
        <InstancedMesh
          ref="nebula"
          :count="4000"
          :position="{ x: 0, y: 0, z: -200 }"
        >
          <SphereGeometry :radius="1.5" />
          <BasicMaterial color="#FF00FF" :props="{ transparent: true, opacity: 0.15, blending: 2 }" />
        </InstancedMesh>

        <!-- Cosmic Dust Particles (floating specs) -->
        <InstancedMesh
          ref="cosmicDust"
          :count="300"
          :position="{ x: 0, y: 0, z: 0 }"
        >
          <SphereGeometry :radius="0.2" />
          <BasicMaterial color="#88ddff" :props="{ transparent: true, opacity: 0.4 }" />
        </InstancedMesh>

        <!-- Asteroid Belt (between planets 3-4) -->
        <InstancedMesh
          ref="asteroidBelt"
          :count="250"
          :position="{ x: 0, y: 0, z: 0 }"
        >
          <BoxGeometry :size="0.8" />
          <StandardMaterial :props="{ color: '#554433', roughness: 0.9, metalness: 0.1 }" />
        </InstancedMesh>
      </Scene>
      <EffectComposer>
        <RenderPass />
        <UnrealBloomPass :strength="bloom.strength" :radius="bloom.radius" :threshold="bloom.threshold" />
      </EffectComposer>
    </Renderer>

    <!-- Hover Tooltip (no changes) -->
    <div
      v-if="hoveredProject"
      class="tooltip fixed z-50 bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-cyan-400/30 shadow-[0_0_25px_#00fff066] max-w-xs pointer-events-none transition-all duration-200"
      :style="tooltipStyle"
    >
      <div
        class="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 border-r border-b border-cyan-400/30 transform rotate-45"
      ></div>
      <h3 class="text-lg font-orbitron text-cyan-300 mb-2">
        {{ hoveredProject.title }}
      </h3>
      <p class="text-sm text-gray-300 mb-2">{{ hoveredProject.year }}</p>
      <div class="flex flex-wrap gap-1 mb-2">
        <span
          v-for="tech in hoveredProject.tech?.slice(0, 3)"
          :key="tech"
          class="text-xs px-2 py-1 bg-cyan-400/20 text-cyan-300 rounded"
        >
          {{ tech }}
        </span>
      </div>
      <p class="text-xs text-gray-400 line-clamp-3">
        {{ hoveredProject.description }}
      </p>
      <p class="text-xs text-cyan-400 mt-2">Click to view details</p>
    </div>

    <!-- Ambient audio toggle -->
    <button
      class="fixed left-4 bottom-4 z-50 px-3 py-2 rounded-md bg-black/50 border border-cyan-400/30 text-cyan-300 hover:bg-black/70 transition-all"
      @click="toggleAmbience()"
    >
      {{ isMuted ? 'Unmute Space' : 'Mute Space' }}
    </button>

    <!-- Return to Galaxy button -->
    <button
      v-if="selectedProject"
      class="fixed right-4 bottom-4 z-50 px-4 py-2 rounded-md bg-cyan-600/80 border border-cyan-400/50 text-white hover:bg-cyan-700 transition-all font-orbitron shadow-[0_0_20px_#00fff044]"
      @click="returnToGalaxy()"
    >
      ← Return to Galaxy
    </button>

    <!-- Project Modal with soft fade/center -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      @click="closeProject()"
    >
      <div
        class="project-modal bg-gray-900/95 backdrop-blur-xl text-white p-8 rounded-2xl border border-cyan-400/30 shadow-[0_0_50px_#00fff033] max-w-2xl max-h-[80vh] overflow-y-auto m-4 animate-scaleIn"
        @click.stop
      >
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-3xl font-orbitron text-cyan-300">
            {{ selectedProject.title }}
          </h2>
          <button
            @click="closeProject()"
            class="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        <img
          v-if="selectedProject.image"
          :src="selectedProject.image"
          class="w-full h-48 object-cover rounded-xl mb-6"
          alt=""
        />
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <span class="text-gray-400">Year:</span>
            <span class="text-cyan-300">{{ selectedProject.year }}</span>
          </div>
          <div v-if="selectedProject.tech?.length">
            <span class="text-gray-400 block mb-2">Technologies:</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in selectedProject.tech"
                :key="tech"
                class="px-3 py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <div>
            <span class="text-gray-400 block mb-2">Description:</span>
            <p class="text-gray-300 leading-relaxed">
              {{ selectedProject.description }}
            </p>
          </div>
          <div class="flex gap-4 pt-4">
            <router-link
              :to="`/projects/${selectedProject.id}`"
              class="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
              @click="selectedProject = null"
            >
              View Details
            </router-link>
            <a
              v-if="selectedProject.github"
              :href="selectedProject.github"
              target="_blank"
              class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProjects } from "../composables/useProjects";
import {
  Renderer,
  Camera,
  Scene,
  PointLight,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  Sphere,
  Group,
  Mesh,
  StandardMaterial,
  BasicMaterial,
  SphereGeometry,
  BoxGeometry,
  InstancedMesh,
  Texture,
  ShaderMaterial,
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
} from "troisjs";
import { Matrix4, Vector3, Color, ACESFilmicToneMapping, TextureLoader, PMREMGenerator, EquirectangularReflectionMapping, SRGBColorSpace, Euler, Quaternion } from "three";

const containerRef = ref(null);
const renderer = ref(null);
const { projects, loadProjects } = useProjects();
const hoveredProject = ref(null);
const selectedProject = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
const planetOrbits = ref([]);
const stars = ref(null);
const starsMid = ref(null);
const starsNear = ref(null);
const nebula = ref(null);
const cosmicDust = ref(null);
const asteroidBelt = ref(null);
const orbitOptions = ref({ enableDamping: true, autoRotate: true, autoRotateSpeed: 0.15 });
const exposure = ref(1.15);
const bloom = ref({ strength: 0.75, radius: 0.35, threshold: 0.85 });
let ambience;
const isMuted = ref(localStorage.getItem('ambience-muted') === '1');
const tooltipAnchor = ref({ x: 0, y: 0 });
const hoveredIndex = ref(null);
const cameraIntroComplete = ref(false);

const planetColors = [
  "#4A9EFF", // Blue (Earth-like)
  "#FF6B4A", // Orange-red (Rocky/Mars)
  "#45B7D1", // Cyan (Oceanic)
  "#F7B801", // Yellow (Gas giant)
  "#9A6BFF", // Purple (Ice/Storm)
  "#6BFF9A", // Green (Forest/Earth-like)
  "#FF4A9E", // Pink (Neon)
  "#FFD700", // Gold (Desert)
  "#FF6347", // Tomato (Volcanic)
  "#87CEEB", // Sky blue (Crystal)
];

const getOrbitRadius = (index) => 60 + index * 30;
const getPlanetSize = (index) => 6 + Math.random() * 4;

function getPlanetColor(index) {
  const project = projects.value[index];
  if (!project) return planetColors[index % planetColors.length];
  
  const colorMap = {
    'earth-like': '#4A9EFF',
    'oceanic': '#45B7D1',
    'gas-giant': '#F7B801',
    'desert': '#FFD700',
    'rocky': '#FF6B4A',
    'ice': '#87CEEB',
    'volcanic': '#FF6347',
    'storm': '#9A6BFF',
    'neon': '#FF4A9E',
    'crystal': '#AADDFF',
  };
  
  return colorMap[project.planetType] || planetColors[index % planetColors.length];
}

function getHoverScale(project) {
  return hoveredProject.value && hoveredProject.value.id === project.id
    ? { x: 1.08, y: 1.08, z: 1.08 }
    : { x: 1, y: 1, z: 1 };
}

function getAtmosphereIntensity(project) {
  return hoveredProject.value && hoveredProject.value.id === project.id ? 1.6 : 0.9;
}

function getPlanetMaterialProps(project, index) {
  const planetType = project.planetType || 'rocky';
  
  // Base material properties based on planet type
  const materialMap = {
    'earth-like': { roughness: 0.6, metalness: 0.05, emissiveIntensity: 0.0 },
    'oceanic': { roughness: 0.3, metalness: 0.2, emissiveIntensity: 0.0 },
    'gas-giant': { roughness: 0.5, metalness: 0.0, emissiveIntensity: 0.0 },
    'desert': { roughness: 0.8, metalness: 0.0, emissiveIntensity: 0.0 },
    'rocky': { roughness: 0.9, metalness: 0.05, emissiveIntensity: 0.0 },
    'ice': { roughness: 0.2, metalness: 0.4, emissiveIntensity: 0.0 },
    'volcanic': { roughness: 0.7, metalness: 0.1, emissiveIntensity: 0.1 },
    'storm': { roughness: 0.4, metalness: 0.0, emissiveIntensity: 0.0 },
    'neon': { roughness: 0.3, metalness: 0.6, emissiveIntensity: 0.3 },
    'crystal': { roughness: 0.1, metalness: 0.8, emissiveIntensity: 0.2 },
  };
  
  const base = materialMap[planetType] || materialMap['rocky'];
  
  // Add hover effects
  base.emissive = hoveredProject.value && hoveredProject.value.id === project.id ? '#2ff5ff' : (planetType === 'volcanic' ? '#ff4400' : (planetType === 'neon' ? '#ff00ff' : '#000000'));
  base.emissiveIntensity = hoveredProject.value && hoveredProject.value.id === project.id 
    ? base.emissiveIntensity + 0.3 
    : base.emissiveIntensity;
  
  // Optional normal maps for first two planets if available
  if (index === 0) {
    base.normalMap = new TextureLoader().load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
    base.normalScale = new Vector3(0.6, 0.6, 0.6);
  }
  if (index === 1) {
    base.normalMap = new TextureLoader().load('https://threejs.org/examples/textures/planets/mars_1k_normal.jpg');
    base.normalScale = new Vector3(0.4, 0.4, 0.4);
  }
  return base;
}

function handlePlanetHover(event, project) {
  hoveredProject.value = project;
  hoveredIndex.value = projects.value.findIndex(p => p.id === project.id);
  if (event.intersection) {
    const screenPos = toScreenPosition(
      event.intersection.point,
      renderer.value.camera
    );
    mousePosition.value = { x: screenPos.x, y: screenPos.y };
    tooltipAnchor.value = { ...mousePosition.value };
  }
  document.body.style.cursor = "pointer";
}

function handlePlanetLeave() {
  hoveredProject.value = null;
  hoveredIndex.value = null;
  document.body.style.cursor = "default";
}

function handlePlanetClick(project, index) {
  selectedProject.value = project;
  focusCameraOn(index);
  tryStartAmbience();
}

const tooltipStyle = computed(() => {
  const offset = 20;
  let left = tooltipAnchor.value.x + offset;
  let top = tooltipAnchor.value.y - offset;

  if (left + 300 > window.innerWidth) {
    left = mousePosition.value.x - 320;
  }
  if (top < 0) {
    top = mousePosition.value.y + offset;
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
    transform: `translate(-50%, -100%)`,
  };
});

onMounted(async () => {
  await loadProjects();

  // Camera cinematic intro
  if (!cameraIntroComplete.value) {
    const cam = renderer.value.camera;
    const controls = renderer.value.orbitCtrl || renderer.value.controls;
    
    // Disable orbit controls during intro
    if (controls) controls.enabled = false;
    
    // Start position: far away looking down
    cam.position.set(0, 300, 1000);
    cam.lookAt(0, 0, 0);
    
    // Animate to final position
    const duration = 4500;
    const start = performance.now();
    const fromPos = cam.position.clone();
    const toPos = new Vector3(0, 80, 350);
    
    function introStep(now) {
      const t = Math.min(1, (now - start) / duration);
      // Ease in-out cubic
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      cam.position.lerpVectors(fromPos, toPos, ease);
      cam.lookAt(0, 0, 0);
      
      if (t < 1) {
        requestAnimationFrame(introStep);
      } else {
        cameraIntroComplete.value = true;
        if (controls) {
          controls.enabled = true;
          controls.target.set(0, 0, 0);
        }
      }
    }
    requestAnimationFrame(introStep);
  }

  renderer.value.onBeforeRender(() => {
    planetOrbits.value.forEach((orbit, index) => {
      if (orbit && orbit.group) {
        const speed = 0.003 / (index * 0.3 + 1);
        orbit.group.rotation.y += speed;
        const planet = orbit.group.children[0];
        if (planet) {
          planet.rotation.y += 0.01;
        }
      }
    });

    // Clouds slow rotation (index 0 clouds are the third mesh in that group)
    const earthGroup = planetOrbits.value[0]?.group;
    if (earthGroup && earthGroup.children[2]) {
      earthGroup.children[2].rotation.y += 0.003;
    }

    // Update tooltip anchor to planet screen position while hovering
    if (hoveredIndex.value != null) {
      const group = planetOrbits.value[hoveredIndex.value]?.group;
      const body = group?.children?.[0];
      if (body) {
        const wp = new Vector3();
        body.getWorldPosition(wp);
        const sp = toScreenPosition(wp, renderer.value.camera);
        tooltipAnchor.value = sp;
      }
    }

    // Animate nebula particles (slow drift)
    if (nebula.value && nebula.value.mesh) {
      const time = performance.now() * 0.00005;
      const dummy = new Matrix4();
      const pos = new Vector3();
      const quat = new Quaternion();
      const scale = new Vector3(1, 1, 1);
      
      for (let i = 0; i < 4000; i++) {
        nebula.value.mesh.getMatrixAt(i, dummy);
        pos.setFromMatrixPosition(dummy);
        pos.y += Math.sin(time + i * 0.01) * 0.05;
        pos.x += Math.cos(time + i * 0.015) * 0.03;
        dummy.compose(pos, quat, scale);
        nebula.value.mesh.setMatrixAt(i, dummy);
      }
      nebula.value.mesh.instanceMatrix.needsUpdate = true;
    }

    // Animate cosmic dust (floating)
    if (cosmicDust.value && cosmicDust.value.mesh) {
      const time = performance.now() * 0.0001;
      const dummy = new Matrix4();
      const pos = new Vector3();
      const quat = new Quaternion();
      const scale = new Vector3(1, 1, 1);
      
      for (let i = 0; i < 300; i++) {
        cosmicDust.value.mesh.getMatrixAt(i, dummy);
        pos.setFromMatrixPosition(dummy);
        pos.y += Math.sin(time * 2 + i * 0.05) * 0.08;
        pos.x += Math.cos(time * 1.5 + i * 0.07) * 0.06;
        pos.z += Math.sin(time * 1.8 + i * 0.04) * 0.07;
        dummy.compose(pos, quat, scale);
        cosmicDust.value.mesh.setMatrixAt(i, dummy);
      }
      cosmicDust.value.mesh.instanceMatrix.needsUpdate = true;
    }

    // Rotate asteroid belt slowly
    if (asteroidBelt.value && asteroidBelt.value.mesh) {
      asteroidBelt.value.mesh.rotation.y += 0.0005;
    }
  });

  const dummy = new Matrix4();
  
  // Far stars layer
  for (let i = 0; i < 1000; i++) {
    dummy.setPosition(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );
    stars.value.mesh.setMatrixAt(i, dummy);
  }
  stars.value.mesh.instanceMatrix.needsUpdate = true;

  // Mid stars layer
  for (let i = 0; i < 500; i++) {
    dummy.setPosition(
      (Math.random() - 0.5) * 1500,
      (Math.random() - 0.5) * 1500,
      (Math.random() - 0.5) * 1500
    );
    starsMid.value.mesh.setMatrixAt(i, dummy);
  }
  starsMid.value.mesh.instanceMatrix.needsUpdate = true;

  // Near stars layer
  for (let i = 0; i < 200; i++) {
    dummy.setPosition(
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000
    );
    starsNear.value.mesh.setMatrixAt(i, dummy);
  }
  starsNear.value.mesh.instanceMatrix.needsUpdate = true;

  // Nebula particles (scattered clouds)
  const nebulaColors = [
    new Color(0xFF00FF), // Magenta
    new Color(0xFF1493), // Deep pink
    new Color(0x00FFFF), // Cyan
    new Color(0x9370DB), // Purple
  ];
  
  for (let i = 0; i < 4000; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 150 + Math.random() * 400;
    const height = (Math.random() - 0.5) * 300;
    
    dummy.setPosition(
      Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
      height,
      Math.sin(angle) * radius + (Math.random() - 0.5) * 100
    );
    nebula.value.mesh.setMatrixAt(i, dummy);
  }
  nebula.value.mesh.instanceMatrix.needsUpdate = true;

  // Cosmic dust (close floating particles)
  for (let i = 0; i < 300; i++) {
    dummy.setPosition(
      (Math.random() - 0.5) * 600,
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 600
    );
    cosmicDust.value.mesh.setMatrixAt(i, dummy);
  }
  cosmicDust.value.mesh.instanceMatrix.needsUpdate = true;

  // Asteroid belt (ring between planets 3-4)
  const asteroidRingRadius = (getOrbitRadius(3) + getOrbitRadius(4)) / 2;
  for (let i = 0; i < 250; i++) {
    const angle = (i / 250) * Math.PI * 2;
    const radiusVariation = asteroidRingRadius + (Math.random() - 0.5) * 20;
    const heightVariation = (Math.random() - 0.5) * 8;
    
    const pos = new Vector3(
      Math.cos(angle) * radiusVariation,
      heightVariation,
      Math.sin(angle) * radiusVariation
    );
    
    const euler = new Euler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    const quat = new Quaternion().setFromEuler(euler);
    const scale = new Vector3(
      0.5 + Math.random() * 1.5,
      0.5 + Math.random() * 1.5,
      0.5 + Math.random() * 1.5
    );
    
    dummy.compose(pos, quat, scale);
    asteroidBelt.value.mesh.setMatrixAt(i, dummy);
  }
  asteroidBelt.value.mesh.instanceMatrix.needsUpdate = true;

  // Skybox / environment with PMREM (equirect starfield)
  const loader = new TextureLoader();
  loader.load(
    'https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg',
    (tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.mapping = EquirectangularReflectionMapping;
      const pmrem = new PMREMGenerator(renderer.value.renderer);
      const env = pmrem.fromEquirectangular(tex).texture;
      renderer.value.scene.environment = env;
      renderer.value.scene.background = tex; // keep equirect as background
      pmrem.dispose();
    }
  );
});

function toScreenPosition(pos, camera) {
  const vector = pos.clone();
  vector.project(camera);
  return {
    x: ((vector.x + 1) / 2) * window.innerWidth,
    y: (-(vector.y - 1) / 2) * window.innerHeight,
  };
}

function focusCameraOn(index) {
  const orbit = planetOrbits.value[index];
  if (!orbit || !orbit.group) return;
  const planet = orbit.group.children[0];
  if (!planet) return;
  // World position of the planet
  const worldPos = new Vector3();
  planet.getWorldPosition(worldPos);

  const cam = renderer.value.camera;
  const controls = renderer.value.orbitCtrl || renderer.value.controls;

  // Simple tween
  const duration = 800; // ms
  const start = performance.now();
  const fromPos = cam.position.clone();
  const toPos = worldPos.clone().add(new Vector3(12, 8, 12));
  const fromTarget = controls?.target?.clone?.() || new Vector3();
  const toTarget = worldPos.clone();

  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const ease = t * (2 - t); // easeOutQuad
    cam.position.lerpVectors(fromPos, toPos, ease);
    if (controls && controls.target) {
      controls.target.lerpVectors(fromTarget, toTarget, ease);
      controls.update?.();
    }
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function closeProject() {
  selectedProject.value = null;
  returnToGalaxy();
}

function returnToGalaxy() {
  selectedProject.value = null;
  // Pull camera back to a nice overview
  const cam = renderer.value.camera;
  const controls = renderer.value.orbitCtrl || renderer.value.controls;
  const duration = 700;
  const start = performance.now();
  const fromPos = cam.position.clone();
  const toPos = new Vector3(0, 80, 350);
  const fromTarget = controls?.target?.clone?.() || new Vector3();
  const toTarget = new Vector3(0, 0, 0);
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const ease = t * (2 - t);
    cam.position.lerpVectors(fromPos, toPos, ease);
    if (controls && controls.target) {
      controls.target.lerpVectors(fromTarget, toTarget, ease);
      controls.update?.();
    }
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function tryStartAmbience() {
  if (ambience) return;
  try {
    const audio = new Audio('/assets/space-ambience.mp3');
    audio.loop = true;
    audio.volume = isMuted.value ? 0 : 0.12;
    audio.play().then(() => (ambience = audio)).catch(() => {});
  } catch {}
}

function toggleAmbience() {
  isMuted.value = !isMuted.value;
  localStorage.setItem('ambience-muted', isMuted.value ? '1' : '0');
  if (ambience) {
    ambience.volume = isMuted.value ? 0 : 0.12;
  } else if (!isMuted.value) {
    tryStartAmbience();
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap");

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

html {
  scroll-behavior: smooth;
}

.project-modal {
  animation: modalAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tooltip {
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 240, 0.3);
  box-shadow: 0 0 25px rgba(0, 255, 240, 0.2),
    0 20px 40px rgba(0, 0, 0, 0.4);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn { animation: fadeIn 200ms ease-out; }

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scaleIn { animation: scaleIn 220ms ease-out; }
</style>