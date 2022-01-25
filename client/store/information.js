import commonMethods from '~/mixins/commonMethods'
export const state = () => ({
  informationList: [],
})

export const getters = {
  getInformationList: (state) => (payload) => {
    if (!payload) return state.informationList
    return commonMethods.methods.filterListWithObjectKeyValue(
      [...state.informationList],
      payload
    )
  },
}

export const actions = {
  setInformation: ({ commit }, payload) => {
    commit('setInformation', payload)
  },
  resetInformation: ({ commit }, payload) => {
    commit('resetInformation', payload)
  },
  removeInformation: ({ commit }, payload) => {
    commit('removeInformation', payload)
  },
}

export const mutations = {
  setInformation: (state, payload) => {
    if (!Array.isArray(payload)) payload = [payload]
    payload.map((payloadItem) => {
      var found = false
      state.informationList.map((informationItem) => {
        if (payloadItem.id === informationItem.id) {
          informationItem = Object.assign(informationItem, payloadItem)
          found = true
        }
      })
      if (!found) state.informationList.push(payloadItem)
    })
    state.informationList.push({ id: 'trigger' })
    state.informationList.pop()
    console.log('this is list input information ', state.informationList)
  },
  resetInformation: (state, payload) => {
    console.log('this is the reset informatin ', payload)
    if (!payload) state.informationList = []
    var keys = Object.keys(payload)
    /**save the first key as the filter key
     *  and then we cna use  for filter the
     * list of the informatin and we can delete it
     */
    if (keys.length > 1) {
      state.informationList.map((informationItem) => {
        if (informationItem[keys[0]] === payload[keys[0]]) {
          informationItem = Object.assign(informationItem, payload)
        }
      })
    }
    state.informationList.push({ id: 'trigger' })
    state.informationList.pop()
  },
  removeInformation: (state, payload) => {
    if (!payload) return
    const result = commonMethods.methods.filterListWithObjectKeyValue(
      [...state.informationList],
      payload
    )
    result.map((item) => {
      state.informationList.splice(state.informationList.indexOf(item), 1)
    })
  },
}
