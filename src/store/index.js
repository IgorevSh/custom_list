import {createStore} from 'vuex'
//import {toRaw} from "vue";


const store= createStore({
    state(){
        return{
            list:[]
        }
    },
    getters:{
        todoList(state){
          return state.list
        },
        getItemById: (state) => (id) => {
            let listRaw=state.list;
            return listRaw[listRaw.findIndex(item => item.id == id)];
        }
    },
    actions:{
        fetchList(ctx){
           const fullList= JSON.parse(localStorage.getItem('test_list_todo'))||[];
           ctx.commit('updateList',fullList)
        },
       deleteElement(ctx,id){
           const index=store.getters.todoList.findIndex(itm=>itm.id==id);
           let newList = store.getters.todoList;
           newList.splice(index,1);
           ctx.commit('updateList',newList);
           ctx.dispatch('saveTodoList');
        },
        addElement(ctx,id){
            ctx.commit('addElement',id)
        },
        saveTodoList(){
            localStorage.setItem('test_list_todo',JSON.stringify(store.getters.todoList));
        },
        saveTodoItem(ctx,{id,tips,title}){
           let newList= store.getters.todoList;
           const index= newList.findIndex(itm=>itm.id==id);
            newList[index].tips=tips;
            newList[index].title=title;
            ctx.commit('updateList',newList);
            ctx.dispatch('saveTodoList');
        }
    },
    mutations:{
        updateList(state,list){
            state.list=list;
        },
        addElement(state,item){
            state.list.push(item);
        }
    }

})
export default store;

