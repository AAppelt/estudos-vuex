import store from '../store'

export default async (to, from, next) => {
  console.log(to)
  if (to.name !== 'login' && !store.getters['auth/hasToken']) {
    try {

    } catch (error) {

    }

  } else {

  }
  next()
}
