<template>
  <div class="checkbox_wrapper" @click="toggleValue">
    <div v-if="localValue" class="trueVal">

    </div>
    <div v-else class="falseVal"></div>
  </div>
</template>

<script>
export default {
  name: "customCheckbox",
  model: {
    prop: "value",
    event: "input",
  },
  emits:["input"],
  props: {
    id: {
      type: String,
    },
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      localValue: false,
    };
  },
  methods:{
    toggleValue(){
      this.localValue=!this.localValue;
      this.$emit("changed", this.localValue);
    },
  },
  mounted(){
    this.localValue = this.value;
  },
  watch: {
    localValue() {
      this.$emit("changed", this.localValue);
    },
    value() {
      this.localValue = this.value;
    },
  },
};
</script>
<style scoped>
.checkbox_wrapper{
  width:12px;
  height: 100%
}
.checkbox_wrapper div{
  width: 12px;
  height: 12px;
}
.checkbox_wrapper:hover{
  cursor: pointer;
}
.trueVal{
  border:2px solid purple;
  border-radius: 12px;
}
.trueVal::before{
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  left: 2px;
  position: relative;
  top: 2px;
  background-color: purple;
}
.falseVal{
  border:2px solid purple;
  border-radius: 10px;
}
</style>
