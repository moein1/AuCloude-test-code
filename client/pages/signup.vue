<template>
  <div>
    <auth2 :fieldData="signup"  :mainObject= "{type :'signup', forgetPassword : true, remember: false , header: 'CREATE YOUR ACCOUNT',otherRounter:{text: 'I already have an account', link:'/signin'}, button: {text : 'Sign up now'}}"/>
  </div>
</template>

<script>
 import * as metaData from '../assets/metadata/inputData';
export default {
  data(){
    return {
      signup : metaData.signup
    }
  },
  middleware :'alreadyAuthenticated'
}
</script>

<style>

</style>