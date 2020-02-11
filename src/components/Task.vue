<template>
  <q-list class="bg-white" separator v-if="items.length">
    <q-separator/>
    <q-slide-item
      v-for="(task, index) in items"
      :key="task.title"
      clickable
      v-ripple
      :class="{ 'done bg-grey-2': task.done }"
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
        <q-item-section @click.stop="edit(task, index)" class="text">
          - {{ task.title }}
        </q-item-section>
      </q-item>
    </q-slide-item>
    <q-separator />
  </q-list>
  <Empty v-else />
</template>

<script>
import Empty from "./Empty";

export default {
  props: [
    'items'
  ],
  components: {
    Empty
  },
  methods: {

    // SLIDE HANDLER
    onLeft (task, { reset }) {
      task.done = !task.done;
      this.timer = setTimeout(() => {
        reset()
      }, 300)
    },
    onRight (val, { reset }) {
      // this.delete(val, reset)
      this.delete(val)
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 0)
    },

    beforeDestroy () {
      clearTimeout(this.timer)
    },

    // Delete task
    // deleteTask(i, reset) {
    //   this.$q
    //     .dialog({
    //       title: "Please confirm",
    //       message: "Really do you want to delete this item?",
    //       cancel: true,
    //       persistent: true
    //     })
    //     .onOk(() => {
    //       this.tasks.splice(i, 1);
    //       this.$q.notify("This item was removed");
    //       this.finalize(reset)
    //     })
    //     .onCancel(() => {
    //       this.finalize(reset)
    //     });
    // },
    // Delete task
    delete(i, reset) {
      // this.$emit('delete', {i, reset})
      this.$emit('delete', i)
    },
    // Edit task
    edit(task, i) {
      this.$emit('edit', {task , i})
    }
  }
}
</script>