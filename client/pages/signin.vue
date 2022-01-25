<template>
  <div>
    <auth2 :fieldData="signin" :mainObject= "{type :'signin', forgetPassword : true, remember: false , header: 'Sign In', otherRounter:{text: 'Create an Account', link:'/signup'} ,button: {text : 'Sign In'}}" />
  </div>
  
</template>

<script>
 import * as metaData from '../assets/metadata/inputData';
export default {
  data(){
    return {
      signin : metaData.signin
    }
  },
  middleware :'alreadyAuthenticated'
}
</script>

<style>

</style>