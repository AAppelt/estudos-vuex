import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

// no context tem o metodo dispatch para chamar outras actions daqui
export const ActionDoLogin = ({ dispatch }, payload) => {
  console.log('ACTIONS: ' + payload)
  // chamada do metodo login da services - executa os actions passados e salva os dados no state
  return services.auth.login(payload).then(res => {
    dispatch('ActionSetUser', res.data.user)
    dispatch('ActionSetToken', res.data.token)
  })
}

export const ActionCheckToken = ({ dispatch, state }) => {
  if (state.token) {
    return Promise.resolve(state.token)
  }

  const token = storage.getLocalToken()

  if (!token) {
    return Promise.reject(new Error('Token invalido'))
  }

  dispatch('ActionSetToken', token)
  return dispatch('ActionLoadSession')
}

export const ActionLoadSession = ({ dispatch }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: { user } } = await services.auth.loadSession()
      dispatch('ActionSetUser', user)
      resolve()
    } catch (error) {
      dispatch('ActionSignOut')
      reject(error)
    }
  })
}

// commit responsavel por chamar a mutation
export const ActionSetUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload)
}

// seta o token no local storage e no cabecalho das requisicoes
export const ActionSetToken = ({ commit }, payload) => {
  storage.setLocalToken(payload)
  storage.setHeaderToken(payload)
  commit(types.SET_TOKEN, payload)
}

export const ActionSignOut = ({ dispatch }) => {
  storage.setHeaderToken('')
  storage.deleteLocalToken()
  dispatch('ActionSetUser', {})
  dispatch('ActionSetToken', '')
}
