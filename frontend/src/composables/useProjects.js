import { ref } from 'vue';
import axios from 'axios';

// Extended planet textures from three.js examples CDN (public, CORS-enabled)
// Sources: https://threejs.org/examples/?q=planet#webgl_materials_lightmap
const textures = [
  'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
  'https://threejs.org/examples/textures/planets/mars_1k_color.jpg',
  'https://threejs.org/examples/textures/planets/jupiter.jpg',
  'https://threejs.org/examples/textures/planets/venus.jpg',
  'https://threejs.org/examples/textures/planets/neptune.jpg',
  'https://threejs.org/examples/textures/planets/uranus.jpg',
  'https://threejs.org/examples/textures/planets/moon_1024.jpg',
  'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg', // Earth-like again
  'https://threejs.org/examples/textures/planets/mars_1k_color.jpg', // Mars variant
  'https://threejs.org/examples/textures/planets/jupiter.jpg', // Jupiter variant
];

export function useProjects() {
  const projects = ref([]);

  const loadProjects = async () => {
    try {
      const api = await axios.get('/api/projects');
      if (Array.isArray(api.data) && api.data.length) {
        projects.value = api.data.map((p, i) => ({
          id: p.id,
          title: p.title,
          year: new Date(p.created_at).getFullYear(),
          tech: [],
          image: p.image_url || '',
          description: p.description,
          github: p.github_url || '',
          texture: textures[i % textures.length],
        }));
      } else {
        throw new Error('Empty API response');
      }
    } catch (err) {
      try {
        const response = await axios.get('/src/data/projects.json');
        // Assign textures to local project data
        projects.value = response.data.map((p, i) => ({
          ...p,
          texture: textures[i % textures.length],
        }));
      } catch (fallbackErr) {
        console.error('Error loading projects:', fallbackErr);
      }
    }
  };

  return { projects, loadProjects };
}
