<template>
<div class="steam-signup-form">
    <div class="front">    
        <h1 class="title">Vocab</h1>       
        <div class="form" action="">
            <div v-for="(input, index) in fieldData.fields" :key="index" >
                <Input :inputData="input" :fillcontainer="fieldData.fillcontainer" />
            </div>
            <p class="fineprint flex-center">
                <input class="form__checkbox" type="checkbox" id="agreement" name="agreement">
                <label for="agreement">I am 13 years of age or older AND agree to the <a href="#">terms and serivces</a>.</label>
            </p>
            <p>
                <img class="recaptcha" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/308367/recaptcha-dark.png" alt="">
            </p>

            <button class="button" :disabled="getInformationList({
            formFillcontainer: fieldData.fillcontainer , hasError: true,
            }).length > 0" 
        @click="authMethod(fieldData.fillcontainer, mainObject)"
         :class="{'button-disabled': getInformationList({
            formFillcontainer: fieldData.fillcontainer , hasError: true,
            }).length > 0}">{{mainObject.button.text}}</button>
            
            <button class="btn btn-dark" @click="googleLogin()" >Login with Google</button>      
            <nuxt-link :to="mainObject.otherRounter.link">{{mainObject.otherRounter.text}}</nuxt-link>
        </div>

    </div>

    <div class="back">
        <h2 class="subheading">Why join Leitner?</h2>
        <ul class="list list--unstyled">
            <li>Learn any lnaguage </li>
            <li>Share your vocab with other people</li>
            <li>Learn from other vocab</li>
            <li>learning several lnaguage at the same time</li>
        </ul>
    </div>

</div>
</template>

<script>
import commonMethods from '~/mixins/commonMethods.js';
export default {
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
         default :{otherRounter : {} , button:{}}
     },
     fieldData : {
         type: Object,
         default : {}
     }
 },
 mixins:[commonMethods]
}
</script>

<style>

</style>
