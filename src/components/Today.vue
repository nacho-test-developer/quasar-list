<template>
  <q-list class="bg-white" separator>
    <q-slide-item
      v-for="(task, index) in items"
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
</template>

<script>
export default {
  props: [
    'items'
  ],
  methods: {

    // SLIDE HANDLER
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

    // Delete task
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
    // Add task
    addTask() {
      if (this.newTask) {
        this.tasks.push({
          title: this.newTask,
          done: false
        });
        this.newTask = "";
      }
    },
    // Edit task
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
}
</script>

<style lang="scss" scoped>

</style>