import commonMethods from '~/mixins/commonMethods'
export const state = () => ({
  fillcontainerList: [],
})

export const getters = {
  getFillcontainerList: (state) => (payload) => {
    const fillcontainer = payload.fillcontainer
    const recentItem = payload.recentItem
    delete payload.fillcontainer
    delete payload.recentItem
    const info =
      state.fillcontainerList.find(
        (infoItem) => infoItem.fillcontainer === fillcontainer
      ) || {}

    var result = info.Row
    /**this is the case we have the form row and need to come back */
    if (!Array.isArray(result)) return result || {}

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        result = result.filter((row) => row[key] === payload[key])
      }
    }
    /**check if we have need just a few recods and have the recent top */
    if (recentItem) {
      result = result.sort(commonMethods.methods.dynamicSort('-jobId'))
      console.log('this is recent ', recentItem, result)
      return result.slice(0, recentItem)
    }
    return result
  },
}

export const actions = {
  setFillcontainer: ({ commit }, payload) => {
    commit('setFillcontainer', payload)
  },
  resetFillcontainer: ({ commit }, payload) => {
    commit('resetFillcontainer', payload)
  },
  removeFillcontainer: ({ commit }, payload) => {
    commit('removeFillcontainer', payload)
  },
}

export const mutations = {
  setFillcontainer: (state, payload) => {
    const fillcontainer = payload.fillcontainer
    delete payload.fillcontainer
    const infoObject = state.fillcontainerList.find(
      (fillcontainerListItem) =>
        fillcontainerListItem.fillcontainer === fillcontainer
    )
    /**this is form case and we have one row for fillcontainer */
    if (!payload.Row) {
      if (infoObject) infoObject.Row = Object.assign(infoObject.Row, payload)
      else {
        state.fillcontainerList.push({
          fillcontainer,
          Row: payload,
        })
      }
    } else {
      /**this is grid case  */
      /**this is first time */
      if (!infoObject)
        state.fillcontainerList.push({
          fillcontainer,
          Row: payload.Row,
        })
      else {
        /**this is for multiselect checkbox */
        if (payload.reInsert && !payload.gridRowId) {
          console.log('this is the new list of checkbox', payload)
          infoObject.Row = payload.Row
          return
        } else if (payload.reInsert && payload.gridRowId) {
          console.log('this is grid row id ', payload)
          infoObject.Row = infoObject.Row.filter(
            (item) => item.gridRowId !== payload.gridRowId
          )
          infoObject.Row = [...infoObject.Row, ...payload.Row]
          return
        }
        payload.Row.map((payloadRow) => {
          var rowExist = false
          infoObject.Row.map((infoObjectRow) => {
            /**updating exist row */
            if (payloadRow.id === infoObjectRow.id) {
              infoObjectRow = Object.assign(infoObjectRow, payloadRow)
              rowExist = true
            }
          })
          if (!rowExist) infoObject.Row.push(payloadRow)
        })
      }
    }
    state.fillcontainerList.push({ id: 'test' })
    state.fillcontainerList.pop()
  },
  resetFillcontainer: (state, payload) => {
    console.log('reset filllcontainer', payload)
    if (payload.fillcontainer)
      state.fillcontainerList = state.fillcontainerList.filter(
        (fillcontainerListItem) =>
          fillcontainerListItem.fillcontainer !== payload.fillcontainer
      )
    state.fillcontainerList.push({ id: 'trigger' })
    state.fillcontainerList.pop()
  },
  removeFillcontainer: (state, payload) => {
    state.fillcontainerList.map((fillcontainerListItem) => {
      if (fillcontainerListItem.fillcontainer === payload.fillcontainer) {
        fillcontainerListItem.Row = fillcontainerListItem.Row.filter(
          (fillcontainerListItemRow) =>
            payload.Row.id
              ? fillcontainerListItemRow.id !== payload.Row.id
              : fillcontainerListItemRow[payload.Row.key] !== payload.Row.value
        )
      }
    })
  },
}
