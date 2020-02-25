<template>
<div></div>
<!-- 
  <q-slide-item
    v-for="(task, index) in item"
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
  </q-slide-item> -->
</template>

<script>
  export default {
    props: [
      item
    ]
  }
</script>

<style lang="scss" scoped>

</style>