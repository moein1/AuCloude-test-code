import axios from 'axios'
const url = 'https://leitner.dev/api/users/'

const SIGNUP = 'setUser'

export const state = () => ({
  user: {},
})

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo(state) {
    return state.auth.user
  },
}

export const actions = {
  setUser: async ({ commit, dispatch }, payload) => {
    try {
      const { email, password, type } = payload
      await axios.post(`${url}${type}`, {
        email,
        password,
      })
      //await axios.get(`${url}currentuser`)
      //commit('setUser', currentuserData.data.currentUser)
      payload.router.replace('/signin')
    } catch (err) {
      console.log('error in signup', err.response.data.errors)
      dispatch('setFillcontainer', {
        fillcontainer: 'message',
        Row: err.response.data.errors,
      })
    }
  },
}

// export const mutations = {
//   setUser: (state, user) => {
//     state.user = user
//   },
// }
