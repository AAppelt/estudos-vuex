export default [

  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName:"home" */'./Home.vue')
  }
]
