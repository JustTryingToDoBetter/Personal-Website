import { createRouter, createWebHistory } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import Home from '@/views/Home.vue'
import Projects from '@/views/Projects.vue'
import About from '@/views/About.vue'
import Blog from '@/views/Blog.vue'
import Contact from '@/views/Contact.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: AppShell,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'projects', name: 'Projects', component: Projects },
      { path: 'about', name: 'About', component: About },
      { path: 'blog', name: 'Blog', component: Blog },
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
