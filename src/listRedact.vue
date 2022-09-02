<template>
  <button @click="goBack" class="back_link">Назад к списку</button>
  <div class="item_wrapper">
    <input class="text_field header_field" v-model="title" placeholder="Введите заголовок">
    <div class="button_menu">
      <button @click="addTask">Добавить</button>
      <button @click="saveTodo">Сохранить</button>
      <button @click="askSetTip">Отменить</button>
      <button @click="deleteToDoList">Удалить</button>
   </div>
    <div class="tasks_list_wrapper">
    <ul class="tasks_list">
      <li v-for="(item,i) in tasks" :key="i">
        <custom-checkbox :value="item.checked" @changed="(state)=>{item.checked=state}"></custom-checkbox>
       <input type="text" placeholder="Имя задачи" class="text_field" v-model="item.name">
        <button @click="deleteTip(i)">✖</button>
      </li>
    </ul>
    </div>
  </div>
  <modal-window ref="modal"></modal-window>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
import customCheckbox from "@/components/customCheckbox";
import modalWindow from "@/components/modalWindow";
export default {
  name: "listRedact",
  components:{
    modalWindow,
    customCheckbox
  },
  data(){
    return{
      title:'',
      tasks:[],
      listItem: {},
      hashBoofer:[],
    }
  },
  computed:{
  ...mapGetters(['getItemById','todoList'])
  },
  mounted(){
    this.setTips();
  },
  /*watch:{
    tasks:{
      handler(){
        this.saveState()
      },
      deep:true
    },
    title:{
      handler(){
        this.saveState()
      },
    },
    hashBoofer:{
      handler(val){
       console.log(val);
      },
      deep:true
    },
  },*/
  methods:{
    ...mapActions(['addElement','saveTodoList','saveTodoItem','deleteElement']),
    addTask(){
      this.tasks.push({name:'Новая запись',checked:false})
    },
    saveState(){
      this.hashBoofer.push(JSON.stringify({title:this.title,tasks:this.tasks}))
    },
    setCheckbox(e,i){
        console.log(e,i);
    },
    setTips(){
      Object.assign( this.listItem,this.getItemById(this.$route.params.id));
      this.title=this.listItem.title;
      this.tasks= JSON.parse( JSON.stringify( this.listItem.tips ) );
    },
    askSetTip(){
      this.setTips()

      //для многократной отмены действия

    /*  if(this.hashBoofer.length>1){
        let load =this.hashBoofer[this.hashBoofer.length-2];
        console.log(load);
        this.title=load.title;
        this.tasks=JSON.parse( JSON.stringify( load.tasks ) );
        this.hashBoofer=this.hashBoofer.splice( this.hashBoofer.length-3,1);
      }*/


    },
    saveTodo(){
      this.saveTodoItem({id:this.$route.params.id,tips:this.tasks,title:this.title});
    },
    deleteTip(index){
      this.tasks.splice(index,1)
    },
    deleteToDoList(){
      this.$refs.modal.setVisibility(()=>{ this.deleteElement(this.listItem.id);
        this.$router.push('/');
      },'Хотите удалить список?');
    },
    goBack(){
      this.$refs.modal.setVisibility(()=>{ this.$router.push('/');},'Прекратить редактирование?');
    }
  },
}
</script>

<style scoped>
.tasks_list_wrapper{
  overflow: auto;
  height: 60vh;
}
.back_link{
  position: absolute;
  left: 15px;
  top: 15px;
  border-radius: 15px;
  height: 30px;
  padding:0 15px;
  border: none;
  background-color: white;
  font-weight: 500;
  font-size: 14px;
}
.text_field,.text_field:focus-visible{
  outline: none;
  border: none;
}
.header_field{
  font-size: 28px;
  margin:15px 0;
  text-align:center;
}
.button_menu{
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 15px auto;
}
.button_menu button{
  width: 100px;
  border-radius: 15px;
  height: 25px;
  border: none;
  padding: 0 15px;
  background-color: purple;
  color: white;
  font-weight: 600;
}
.item_wrapper{
  width: 80%;
  max-width: 550px;
  height: 80vh;
  margin: auto;
  background-color: white;
  border-radius: 15px;
}
.tasks_list button{
  font-size: 16px;
  font-weight: 900;
  border: none;
  color: purple;
  background: none;
}
.tasks_list input:checked {
  background-color: purple
}
.tasks_list li {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 15px;
}
</style>
