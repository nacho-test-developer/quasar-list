
const routes = [
  {
    path: '/new',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Todo.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/TabsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Todo.vue') }
    ]
  },
  {
    path: '/help',
    component: () => import('layouts/Blank.vue'),
    children: [
      { path: '', component: () => import('pages/Help.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
