<template>
  <div>
    <div>
      <h1>ToDo List</h1>
      <button class="create_button" @click="createNewListItem()">
        Добавить заметки
      </button>
    </div>
    <div class="items_list">
      <item-list
        v-for="item in todoList"
        :key="item.id"
        :item="item"
        @deleteItem="deleteItem"
      >
      </item-list>
    </div>
  </div>
  <modal-window ref="modal"></modal-window>
</template>

<script>
import modalWindow from "@/components/modalWindow";
import { mapGetters, mapActions } from "vuex";
import itemList from "@/components/listItem.vue";
export default {
  name: "MainComponent",
  components: {
    itemList,
    modalWindow,
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["todoList"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["addElement", "saveTodoList", "deleteElement"]),
    createNewListItem() {
      this.addElement({
        id: Date.now(),
        title: "Новая запись",
        tips: [{ name: "Новая запись", checked: false }],
      });
      this.saveList();
    },
    saveList() {
      this.saveTodoList();
    },
    deleteItem(id) {
      this.$refs.modal.setVisibility(() => {
        this.deleteElement(id);
      });
    },
  },
};
</script>
<style>
.items_list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
h1 {
  color: white;
  margin: 15px 0;
  font-size: 48px;
  font-weight: 900;
}
.create_button {
  border-radius: 15px;
  height: 30px;
  padding: 0 15px;
  margin: 15px;
  border: none;
  background-color: white;
  font-weight: 500;
  font-size: 14px;
  /*width: 120px;*/
}
</style>
