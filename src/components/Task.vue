<template>
  <q-list class="bg-white" separator>
    <q-separator v-show="items.length" />
    <q-slide-item
      v-for="(task, index) in items"
      :key="task.title"
      clickable
      v-ripple
      :class="{ 'done bg-grey-2': task.isDone }"
      @left="onLeft(task, $event)"
      @right="onRight(task, $event)"
      right-color="red"
    >
      <template v-slot:left>
        <q-icon name="done" />
      </template>
      <template v-slot:right>
        <q-icon name="delete" />
      </template>

      <q-item>
        <q-item-section
          @click.stop="edit(task, index)"
          class="text"
          v-text="task.title"
        />
      </q-item>
    </q-slide-item>
    <q-separator />
  </q-list>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    // SLIDE HANDLER
    onLeft(task, { reset }) {
      task.isDone = !task.isDone;

      this.done(task);

      this.timer = setTimeout(() => {
        reset();
      }, 200);
    },

    onRight(task, { reset }) {
      this.delete(task);

      this.timer = setTimeout(() => {
        reset();
      }, 200);
    },

    beforeDestroy() {
      clearTimeout(this.timer);
    },

    // Delete task
    delete(task) {
      this.$emit("delete", task);
    },
    // IsDone task
    done(task) {
      this.$emit("done", task);
    },
    // Edit task
    edit(task, i) {
      this.$emit("edit", { task, i });
    }
  }
};
</script>