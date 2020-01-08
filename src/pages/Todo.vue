<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        filled
        placeholder="Add Task"
        dense
        square
        bg-color="white"
        class="col"
      >
        <template v-slot:append>
          <q-btn
            @click="addTask"
            v-show="newTask"
            round
            dense
            flat
            icon="add"
          />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator>
      <!--  -->
      <q-slide-item
        v-for="(task, index) in tasks"
        :key="task.title"
        clickable
        v-ripple
        :class="{ 'done bg-blue-1': task.done }"
        @left="onLeft(task, $event)"
        @right="onRight(index, $event)"
        right-color="red"
      >
        <template v-slot:left>
          <q-icon name="done" />
        </template>
        <template v-slot:right>
          <q-icon name="delete" />
        </template>

        <q-item>
          <q-item-section @click.stop="edit(task, index)" class="text">{{ task.title }}</q-item-section>
        </q-item>
      </q-slide-item>
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
            "Test",
          done: false
        }
      ]
    };
  },
  methods: {
    onLeft (task, { reset }) {
      task.done = !task.done
      this.finalize2(reset)
    },
    onRight (val, { reset }) {
      this.deleteTask(val, reset)
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 0)
    },
    finalize2 (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 300)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    deleteTask(i, reset) {
      this.$q
        .dialog({
          title: "Please confirm",
          message: "Really do you want to delete this item?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.tasks.splice(i, 1);
          this.$q.notify("This item was removed");
          this.finalize(reset)
        })
        .onCancel(() => {
          this.finalize(reset)
        });
    },
    addTask() {
      if (this.newTask) {
        this.tasks.push({
          title: this.newTask,
          done: false
        });
        this.newTask = "";
      }
    },
    edit(task, i) {
      this.$q
        .dialog({
          title: "Edit task",
          prompt: {
            model: task.title,
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.tasks[i].title = data
        });
    }
  }
};
</script>

<style lang="scss">
.done {
  .q-item__label,
  .text {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>
