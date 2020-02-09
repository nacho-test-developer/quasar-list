<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-space />
        <q-btn flat round dense icon="add" />
      </q-toolbar>
      <q-toolbar inset>
        <q-toolbar-title>
          <strong>Daily</strong>
          <span class="text-subtitle2 q-pl-sm">({{ todayDate }})</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-img src="https://static.vecteezy.com/system/resources/previews/000/101/253/non_2x/vector-free-abstract-background-1.jpg" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>
              Todo
            </q-item-section>
          </q-item>
          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>
              Help
            </q-item-section>
          </q-item>
          <q-item to="/new" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="done" />
            </q-item-section>

            <q-item-section>
              New
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="statics/bg_panel.jpg"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent text-blue-grey-13">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Ignacio Arguello</div>
          <div>@yoelnacho</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive><router-view /></keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";

export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    todayDate() {
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, "DD/MM/YYYY");
    }
  }
};
</script>

<style lang="scss">
.header-image {
  filter: grayscale(50%);
  height: 100%;
  opacity: .5;
  z-index: -1;
}
</style>
