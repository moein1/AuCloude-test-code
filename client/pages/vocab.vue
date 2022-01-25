<template>
  <div>
        <div class="form-container">
            <div v-for="(input, index) in vocabData.fields" :key="index" >
                <Input :inputData="input"  :fillcontainer="vocabData.fillcontainer" :selectList="voiceList" />
            </div>  
            <div class="leitner-button-area">
              <button class="leitner-button" :disabled="getInformationList({
              formFillcontainer: vocabData.fillcontainer , hasError: true,
              }).length > 0"         
          :class="{'button-disabled': getInformationList({
              formFillcontainer: vocabData.fillcontainer , hasError: true,
              }).length > 0}" @click="saveVocab(vocabData.fillcontainer)" >Save</button>
              <button class="leitner-button" @click="playVoice()" :disabled="getInformationList({
              formFillcontainer: vocabData.fillcontainer , hasError: true,
              }).length > 0"         
          :class="{'button-disabled': getInformationList({
              formFillcontainer: vocabData.fillcontainer , hasError: true,
              }).length > 0}" >Speaker</button>
            </div>
        </div>
  </div>
</template>

<script>
import commonMethods from '~/mixins/commonMethods.js';
import * as metaData from '../assets/metadata/inputData';
export default {
  data(){
    return {
      vocabData : metaData.vocabData,
      synth : null,
      voiceList:[]
    }
  },
  methods:{
    populateVoiceList() {
    this.voiceList = this.synth.getVoices();
    console.log('this is list of voice ', this.voiceList);
    for (const iterator of this.voiceList) {
      iterator.text = `${iterator.name} (${iterator.lang})`
      /**setting default */
      if(iterator.default)
        this.setFillcontainer({
         fillcontainer : this.vocabData.fillcontainer,
         'voice' : iterator.name
       })
     }
     /**setting the default value  */
    },
    playVoice(){
      const wordValue = this.getTheInputValue(this.vocabData.fillcontainer, 'word');
      const voiceValue = this.getTheInputValue(this.vocabData.fillcontainer , 'voice');
      console.log('this is wordValue ', wordValue, voiceValue);
      const voice = this.voiceList.find(voice=> voice.name === voiceValue  );
      console.log('selected voice ', voice);
      var utterThis = new SpeechSynthesisUtterance(wordValue);
      utterThis.voice = voice;
      utterThis.pitch = 1;
      utterThis.rate = 1;
      this.synth.speak(utterThis);
    }
  },
middleware: "isAuthenticated",
mixins:[commonMethods],
mounted(){
  this.synth = window.speechSynthesis;
  this.populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = this.populateVoiceList;
}

}
}
</script>

<style>

</style>