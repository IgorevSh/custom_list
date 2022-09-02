<template>
  <div :class="{not_visible:isVisible,layout:true}">
    <div class="modal_body">
      <h3>{{question}}</h3>
      <div class="button_wrapper">
    <button class="yes_button" @click="acception()">Да</button><button class="no_button" @click="decline()">Нет</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalWindow",
  data(){
    return{
      isVisible:true,
      mainEvent:null,
      question:'',
    }
  },
  methods:{
    acception(){
      this.isVisible=true;
      this.mainEvent();
    },
    decline(){
      this.isVisible=true;
    },
    setVisibility(func,title='Вы уверены?'){
      this.isVisible=false;
      this.mainEvent=func;
      this.question=title;
    }
  }
}
</script>

<style scoped>
.not_visible{
display: none;
}
.layout{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top:0;
  z-index: 10000;
  background-color: rgba(0,0,0,0.5);
}
.modal_body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  border-radius: 15px;
  top: 50%;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  margin-top: -50px;
  width: 200px;
  height: 100px;
}
.modal_body h3{
  margin: 15px 0;
}
button{
  padding: 0;
  width: 35%;
  border-radius:15px;
  height: 25px;
  border: none ;
}
.button_wrapper{
  display: flex;
  justify-content: space-between;
}
.yes_button{
  background-color: purple;
  color:white;
  font-size: 14px;
  font-weight: 600;
}
.no_button{
  color:white;
  background-color: purple;
  font-size: 14px;
  font-weight: 600;
}

</style>
