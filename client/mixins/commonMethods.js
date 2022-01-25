import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      setUser: 'userMangagment/setUser',
      setInformation: 'information/setInformation',
      setFillcontainer: 'fillcontainer/setFillcontainer',
      removeInformation: 'information/removeInformation',
    }),
    /**
     * 
     * @param {'*'} url 
     * @param {*} method 
     * @param {*} body 
     * @param {*} onSuccess 
     */
    async doRequest(url, method, body, onSuccess) {
      try {
        var argument = [url]
        if (body) argument.push(body)
        const response = await this.$axios[method](...argument)
        if (onSuccess) onSuccess(response.data)
      } catch (error) {
        console.log(
          'this is the error that we recieved',
          error.response.data.errors
        )
      }
    },
    /**
     * 
     * @param {*} fillcontainer 
     */
    saveVocab(fillcontainer) {
      const vocab = this.getFillcontainerList({
        fillcontainer,
      })
      console.log('this is vocab data ', vocab)
      this.doRequest('/api/vocabs/new', 'post', vocab, (result) => {
        console.log('this is the result after adding the new words', result)
      })
    },
    /**
     * 
     * @param {*} fillcontainer 
     * @param {*} authObject 
     * @returns 
     */
    authMethod(fillcontainer, authObject) {
      const auth = this.objectDeepCopy(
        this.getFillcontainerList({
          fillcontainer,
        }) || {}
      )
      const validationError = this.checkValidation(fillcontainer, auth)
      console.log('this is auth ', auth)
      /**check if we ahve validation error just come back */
      if (validationError) return
      if (authObject.type === 'signin') this.login(auth)
      else
        this.setUser(
          Object.assign(auth, { type: authObject.type, router: this.$router })
        )
    },
    /**
     * 
     * @param {*} auth 
     */
    login(auth) {
      try {
        this.localLogin(auth)
      } catch (error) {
        console.log('this is error ', error)
      }
    },
    /**
     * 
     */
    googleLogin() {
      this.$auth.loginWith('google')
    },
    async localLogin(auth) {
      const response = await this.$auth.loginWith('local', {
        data: {
          email: auth.email,
          password: auth.password,
        },
      })
      console.log('this is response ', response)
      //this.$auth.setUser(response.data)
      this.checkLogin()
    },

    checkLogin() {
      console.log(this.$auth.user)
    },
    /**
     * 
     * @param {*} property 
     * @returns 
     */
    dynamicSort(property) {
      var sortOrder = 1
      if (property[0] === '-') {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
        return result * sortOrder
      }
    },
    /**
     * 
     * @param {*} link 
     */
    openLink(link) {
      this.$router.push(link)
    },
    filterListWithObjectKeyValue(list, payload) {
      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          list = list.filter((row) => row[key] === payload[key])
        }
      }
      return list
    },
    getTheInputValue(fillcontainer, fieldref) {
      const report = this.getFillcontainerList({
        fillcontainer,
      })
      return report[fieldref]
    },
    objectDeepCopy(object) {
      return JSON.parse(JSON.stringify(object))
    },
    /**
     *
     * @param {*} formFillcontainer
     * @param {*} fieldValueObject
     * @returns
     */
    checkValidation(formFillcontainer, fieldValueObject) {
      let validationList = []
      let requireValidationError = this.checkValidationBuilder(
        formFillcontainer,
        fieldValueObject,
        'required',
        { required: true },
        'is required'
      )
      validationList = [...validationList, ...requireValidationError]
      /**checking email error */
      let emailValidationError = this.checkValidationBuilder(
        formFillcontainer,
        fieldValueObject,
        'email',
        { type: 'email' },
        'email is incorrect'
      )
      validationList = [...validationList, ...emailValidationError]

      /**check the value min-width  */
      let minWidthValidationError = this.checkValidationBuilder(
        formFillcontainer,
        fieldValueObject,
        'minWidth',
        { checkWidth: true }
      )
      validationList = [...validationList, ...minWidthValidationError]
      /**checking field pair like password and re-enter password checkFieldPair: true, */
      let fieldPairValidationError = this.checkValidationBuilder(
        formFillcontainer,
        fieldValueObject,
        'fieldPair',
        { checkFieldPair: true }
      )
      validationList = [...validationList, ...fieldPairValidationError]
      console.log('validation error ', validationList)
      return validationList.length > 0
    },
    /**
     *
     * @param {b} formFillcontainer
     * @param {*} fieldValueObject
     * @param {*} errorType
     * @param {*} errorConditon
     * @param {*} error
     */
    checkValidationBuilder(
      formFillcontainer,
      fieldValueObject,
      errorType,
      errorConditon,
      error
    ) {
      let validationList = []
      const validationFieldList = this.getInformationList({
        formFillcontainer,
        ...errorConditon,
      })
      if (fieldValueObject)
        for (const information of validationFieldList) {
          /**check if we dont have value add it to the required error list */
          let testCondtion = true
          switch (errorType) {
            case 'required':
              testCondtion = fieldValueObject[information.fieldref]
              break
            case 'email':
              testCondtion = this.validateEmail(
                fieldValueObject[information.fieldref]
              )
              break
            case 'minWidth':
              testCondtion =
                (fieldValueObject[information.fieldref] || '').length >=
                information.minWidth
              error = `Minimum ${information.minWidth} characters`
              break
            case 'fieldPair':
              testCondtion =
                fieldValueObject[information.fieldref] ===
                fieldValueObject[information.fieldPair.fieldref]
              error = `${information.label} and ${information.fieldPair.label} should be same`
            default:
              break
          }
          if (!testCondtion && !information.id.includes('validation')) {
            validationList.push(
              Object.assign(this.objectDeepCopy(information), {
                error,
                id: `${information.id}-validation-${errorType}`,
                fieldId: `${information.id}-validation`,
                hasError: true,
                errorType,
              })
            )
          }
        }
      /**add the list of error to the inforatmion list */
      this.setInformation(validationList)
      return validationList
    },
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    getValidationError(id) {
      return (
        this.getInformationList({
          fieldId: `${id}-validation`,
        }) || []
      )
    },
    /**
     * 
     * @param {*} email 
     * @returns 
     */
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return re.test(String(email).toLowerCase())
    },
    /**
     * 
     * @param {*} id 
     */
    getPendingMode(id) {
      this.getInformationList({
        id,
        pending: true,
      }).length > 0
    },
    /**
     * 
     * @param {*} inputObject 
     * @param {*} value 
     * @param {*} fillcontainer 
     */
    setAndResetInputValidation(inputObject, value = '', fillcontainer) {
      const fieldValueObject = this.objectDeepCopy(
        this.getFillcontainerList({
          fillcontainer,
        }) || {}
      )

      const inputData = this.objectDeepCopy(inputObject)
      this.setInformation({ id: inputData.id, pending: true })
      /**set and reset the required error  */
      if (inputData.required)
        this.setAndResetInputValidationBuilder(
          inputData,
          value,
          'required',
          'is required'
        )
      /**set and reset the min-width error */
      if (inputData.checkWidth && value.length >= inputData.minWidth)
        this.removeInformation({
          id: `${inputData.id}-validation-minWidth`,
        })
      /**set and reset the fieldPair error */
      if (
        inputData.fieldPair &&
        value === fieldValueObject[inputData.fieldPair.fieldref]
      ) {
        this.removeInformation({
          id: `${inputData.fieldPair.id}-validation-fieldPair`,
        })
        this.removeInformation({
          id: `${inputData.id}-validation-fieldPair`,
        })
      }
      /**set and reset email error  */
      if (this.validateEmail(value))
        this.removeInformation({
          id: `${inputData.id}-validation-email`,
        })
    },
    /**
     * 
     * @param {*} inputData 
     * @param {*} condition 
     * @param {*} errorType 
     * @param {*} error 
     */
    setAndResetInputValidationBuilder(inputData, condition, errorType, error) {
      /**remvoe validation error if we have value  */
      if (condition) {
        this.removeInformation({
          id: `${inputData.id}-validation-${errorType}`,
        })
      }
      const currentErrorForField =
        this.getInformationList({
          id: `${inputData.id}-validation-${errorType}`,
        }) || []

      /**check if the field is required add the error */
      if (!condition && currentErrorForField.length === 0)
        this.setInformation([
          Object.assign(inputData, {
            error,
            id: `${inputData.id}-validation-${errorType}`,
            fieldId: `${inputData.id}-validation`,
            hasError: true,
            errorType,
          }),
        ])
    },
    /**
     * 
     * @returns 
     */
    isDevelempmentMode() {
      return process.env.NODE_ENV === 'development'
    },
    /**
     * 
     * @param {*} methodName 
     * @param {*} args 
     * @returns 
     */
    handlerFunction(methodName, args = []) {
      if (!methodName) return
      console.log('ths is argument', args, methodName)
      this[methodName](...args)
    },
    /**
     * 
     * @param {*} fieldref 
     * @param {*} fillcontainer 
     */
    getVocab(fieldref, fillcontainer) {
      const query = {
        params: {
          [fieldref]: this.getTheInputValue(fillcontainer, fieldref),
        },
      }
      console.log('query to sever ', query)
      this.doRequest('/api/vocabs/get', 'get', query, (result) => {
        console.log('this is the result after adding the new words', result)
        /**this is the case the vocab exist */
        if (result)
          this.setFillcontainer(Object.assign(result, { fillcontainer }))
      })
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'userMangagment/isAuthenticated',
      getFillcontainerList: 'fillcontainer/getFillcontainerList',
      getUserInfo: 'userMangagment/getUserInfo',
      getInformationList: 'information/getInformationList',
    }),
  },
}
