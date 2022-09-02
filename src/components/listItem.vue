<template>
<div class="item_block_wrapper">
  <div class="item_block">
    <h2>{{item.title||'Title'}}</h2>

     <!--<span>{{item.id}}</span>-->
      <h3 v-if="!item.tips.length"  >No ToDo's</h3>
      <ul v-else class="tips_list">
        <li v-for="(tip,i) in item.tips.slice(0,4)" :key="tip.name+i">
         <span v-if="tip.checked">✔</span><span v-else>✖</span>{{tip.name}}
        </li>
      </ul>
      <div v-if="item.tips.length-4>0">
        <b>И еще {{item.tips.length-4}} записи</b>
      </div>
      <ul class="buttons">
        <li><button @click="redactItem(item.id)">Редактировать</button></li>
        <li><button  @click="$emit('deleteItem',item.id)">Удалить</button></li>
      </ul>
  </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "listItem",
  data(){
    return{
      list:[],
    }
  },
  props: {
    item:{
      type:Object
    },
    modal:{}
  },
  emits: ['deleteItem'],
  mounted(){
    this.list=JSON.parse(localStorage.getItem('test_list_todo'))||[];
  },
  methods: {
    ...mapActions(['deleteElement']),
    redactItem(id){
      this.$router.push(`/${id}`)
    },
    /*deleteItem(id){
     // this.modal.setVisibility(this.deleteElement(id));
      this.$emit('deleteItem',id);
      //this.deleteElement(id);
    }*/
  }
}
</script>

<style scoped>
h2{
  text-overflow: ellipsis;
  overflow: hidden;
}
ul{
  list-style: none;
  padding: 0 15px;
}
button{
  cursor: pointer;
}
ul.buttons{
  list-style: none;
  display: flex;
  gap:15px;
  padding: 0;
  margin: 0 15px;
}
ul.buttons li button{
  padding: 0;
  width: 100%;
  border-radius:15px;
  height: 25px;
  border: none;
  background-color: purple;
  color: white;
  font-size: 16px;
}
ul.buttons li{
  width: 50%;
}
.item_block{
  width: 450px;
  min-height: 150px;
  padding: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 15px;
}
h3{
  text-align: center;
  margin: 15px 0;
}
.item_block_wrapper{
  margin: auto;
}
.tips_list{
  text-align: left;
  font-size: 18px;
}
.tips_list li{
  font-weight: 500;
}
.tips_list li span {
margin:0 5px;
  color: purple;
}
</style>
