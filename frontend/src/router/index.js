import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/Home.vue'
import Projects from '@/views/Projects.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import ThemePreview from '../views/ThemePreview.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: ThemePreview },
      { path: 'projects', name: 'Projects', component: Projects },
      { path: 'about', name: 'About', component: About },
      { path: 'contact', name: 'Contact', component: Contact },
      { path: ':pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router