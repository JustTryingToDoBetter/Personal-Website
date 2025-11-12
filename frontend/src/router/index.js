import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Home from '../views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import ProjectDetails from '@/views/ProjectDetails.vue'
import ProjectsGallery from '@/views/ProjectsGallery.vue'
import Blog from '@/views/Blog.vue'
import BlogPost from '@/views/BlogPost.vue'
import Research from '@/views/Research.vue'
import CaseStudies from '@/views/CaseStudies.vue'
import CaseStudyDetail from '@/views/CaseStudyDetail.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'projects', name: 'Projects', component: ProjectsGallery },
      { path: 'projects/:id', name: 'ProjectDetails', component: ProjectDetails },
      { path: 'case-studies', name: 'CaseStudies', component: CaseStudies },
      { path: 'case-studies/:id', name: 'CaseStudyDetail', component: CaseStudyDetail },
      { path: 'research', name: 'Research', component: Research },
      { path: 'about', name: 'About', component: About },
      { path: 'contact', name: 'Contact', component: Contact },
      { path: 'blog', name: 'Blog', component: Blog },
      { path: 'blog/:slug', name: 'BlogPost', component: BlogPost },
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