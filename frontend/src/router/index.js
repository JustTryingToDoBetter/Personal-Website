
import { createRouter, createWebHistory } from 'vue-router'

// Lazy‑load views for better performance
const Home = () => import('../views/Home.vue')
const Projects = () => import('../views/Projects.vue')
const About = () => import('../views/About.vue')
const Contact = () => import('../views/Contact.vue')
const ProjectDetails = () => import('../views/ProjectDetails.vue')
const ThemePreview = () => import('../views/ThemePreview.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/projects/:id', name: 'ProjectDetails', component: ProjectDetails },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/preview', name: 'ThemePreview', component: ThemePreview},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router