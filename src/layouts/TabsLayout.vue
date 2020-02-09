<template>
  <q-layout view="lHh lpr lFf" container class="shadow-2 container">
    <q-header elevated>
      <!-- <q-toolbar>
        <q-icon size="md" name="shutter_speed" />

        <q-toolbar-title>Daily</q-toolbar-title>

        <q-btn
          @click="dialog = true"
          flat
          round
          dense
          class="text-secondary"
          icon="help"
        />
      </q-toolbar> -->

      <q-tabs v-model="tab" class="q-pt-xs">
        <q-tab name="yesterday" label="Yesterday" />
        <q-tab name="today" label="Today" />
        <q-tab name="blockers" label="Blockers">
          <q-badge color="red" floating>2</q-badge>
        </q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page class="">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel class="q-pa-none" name="yesterday">
            <div class="q-pa-lg">
              <div class="text-h6">What did you do yesterday?</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </q-tab-panel>

          <q-tab-panel name="today">
            <div class="q-pa-lg">
              <div class="text-h6">What will you do today?</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </q-tab-panel>

          <q-tab-panel name="blockers">
            <div class="q-pa-lg">
              <div class="text-h6">Any blockers?</div>
              There are impediments in your way
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn size="md" round color="secondary" icon="add" />
        </q-page-sticky>
      </q-page>
    </q-page-container>

    <Dialog :show="dialog" @close="close($event)"></Dialog>

  </q-layout>
</template>

<script>
import Dialog from "./../components/Dialog.vue";

export default {
  components: {
    Dialog
  },
  data () {
    return {
      tab: "today",
      dialog: false
    }
  },
  methods: {
    close(val) {
      this.dialog = val
    }
  }
}
</script>

<style lang="scss">
.container {
  height: 100vh;
}
.logo {
  filter: grayscale(50%);
  height: 100%;
  opacity: .5;
  z-index: -1;
}
</style>

