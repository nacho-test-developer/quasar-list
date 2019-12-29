<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        filled
        placeholder="Add Task"
        maxlength="12"
        dense
        square
        bg-color="white"
        class="col"
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="(task, index) in tasks"
        :key="task.title"
        v-ripple
        clickable
        :class="{ 'done bg-blue-1': task.done }"
        @click="task.done = !task.done"
      >
        <q-item-section avatar>
          <q-checkbox
            class="no-pointer-events"
            v-model="task.done"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="task.done" side>
          <q-btn
            @click.stop="deleteTask(index)"
            flat
            dense
            round
            color="primary"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageTodo",
  data() {
    return {
      newTask: "",
      tasks: [
        {
          title: "Hacer tarea 1",
          done: false
        },
        {
          title: "Mi tarea 2",
          done: false
        },
        {
          title:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, hic optio, ea animi deleniti ratione ullam voluptatibus quidem earum ipsa porro eaque atque inventore fugiat itaque cum! Adipisci, corporis eius.",
          done: false
        }
      ]
    };
  },
  methods: {
    deleteTask(i) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.tasks.splice(i, 1);
          this.$q.notify("Nice");
        });
    },
    addTask() {
      this.tasks.push({
        title: this.newTask,
        done: false
      });
      this.newTask = "";
    }
  }
};
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>
