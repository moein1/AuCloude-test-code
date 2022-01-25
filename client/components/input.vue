<template>
  <div>
    <div class="label-error">
       <label :class="[inputData.labelClass]" for="email">{{inputData.label}}
      <span v-if="inputData.tooltipText" :class="[inputData.tooltipClass]" :data-tooltip="inputData.tooltipText">?</span></label>
      <div class="error-section">
        <span v-for="(errorItem,index) in getValidationError(inputId)" :key="index">
          {{errorItem.error}}{{(index + 1) === getValidationError(inputId).length ? '' : ',' }}
        </span>
      </div>
    </div>
   <div v-if="inputData.type !=='texarea' && inputData.type !=='select'">
      <input :id="inputId" @blur="handlerFunction(inputData.blur, [inputData.fieldref ,fillcontainer ])"
       :type="inputData.type" :class="[inputData.inputClass, 
    {'input-required' :inputData.required, 
    'input-error':getValidationError(inputId).length > 0,
    'input-pending' : getInformationList({
        id:inputId,
        pending: true,
      }).length > 0}]" 
      v-model="inputComputed" >
   </div>   
 <textarea v-if="inputData.type ==='texarea' && inputData.type !=='select'" :id="inputId" :type="inputData.type" :class="[inputData.inputClass, 
    {'input-required' :inputData.required, 
    'input-error':getValidationError(inputId).length > 0,
    'input-pending' : getInformationList({
        id:inputId,
        pending: true,
      }).length > 0}]" :rows="inputData.rows"
      v-model="inputComputed" ></textarea>
  <div v-if="inputData.type ==='select'">
    <select :id="inputId"  :class="[inputData.inputClass, 
    {'input-required' :inputData.required, 
    'input-error':getValidationError(inputId).length > 0,
    'input-pending' : getInformationList({
        id:inputId,
        pending: true,
      }).length > 0}]" 
      v-model="inputComputed"  >
        <option :value="voice.name" v-for="(voice,index) in selectList" :key="index">{{voice.text}}</option>
      </select>
  </div>
  
  </div>
</template>

<script>
import commonMethods from '~/mixins/commonMethods.js';
export default {
 name :'input-component',
 data(){
     return {
         
     }
 },
 props:{
   inputData : {
     type : Object,
     default : {},
   
   },
   rowId: String,
   fillcontainer: String,
     selectList:{
       type: Array,
       default : []
     }
 },
 mixins:[commonMethods],
 computed : {
   inputId (){
    return `${this.inputData.id}${this.rowId ? this.rowId : ''}`;
   } ,
   inputComputed :{
     get(){
      return this.getTheInputValue(this.fillcontainer, this.inputData.fieldref )
     },
     set(value){
       this.setFillcontainer({
         fillcontainer : this.fillcontainer,
         [this.inputData.fieldref] : value
       })
       /**call the method for checking validation
        * and adding pending mode
        */
       this.setAndResetInputValidation(this.inputData, value, this.fillcontainer);
     }
   }
  
 },
 mounted(){
   /**load input information in the store */
   this.setInformation(Object.assign(this.inputData , {
     id : this.inputId,
     rowId: this.rowId,
     infoType:'input',
     formFillcontainer: this.fillcontainer,
   }));
 }
}
</script>

<style>

</style>