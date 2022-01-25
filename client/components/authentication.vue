<template>
  <div class="auth" >
      <div class="box">
          <div class="form">
              <h2>{{mainObject.header}}</h2>
              <div class="form" >
                  <div class="inputBx">
                      <input type="text" placeholder="Username" v-model="auth.email" class="input-control input-with-icon">
                      <span class="material-icons inside-icon">person</span>
                  </div>
                  <div class="inputBx">
                      <input type="text" placeholder="Password" v-model="auth.password" class="input-control input-with-icon">
                      <span class="material-icons inside-icon">lock</span>
                  </div>
                  <label   class="remember" v-if="mainObject.remember">
                      <input type="checkbox" name="remember" id="remember"> Remeber me
                  </label>
                  <div class="inputBx">
                      <input class="input-control button-default" type="submit" @click="authMethod(auth, mainObject)" value="Login">
                  </div>
              </div>
              <p class="mainObject.forget"> Forget <a href="#">Pasword</a> </p>
              <p>Neet an <a href="#">Account</a></p>
          </div>
      </div>      
  </div>
</template>

<script>
import commonMethods from '~/mixins/commonMethods.js';
export default {
 name :'auth',
 data(){
     return {
         auth:{
             email: '',
             password : ''
         }
     }
 },
 props:{
     mainObject : {
         type : Object,
         default :{}
     }
 },
 mixins:[commonMethods]
}
</script>

<style>

</style>