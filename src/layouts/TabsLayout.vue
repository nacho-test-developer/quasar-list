<template>
  <q-layout view="lHh lpr lFf" container class="shadow-2 container">
    <q-header elevated>
      <q-tabs v-model="tab">
        <q-tab name="yesterday" label="Yesterday" />
        <q-tab name="today" label="Today" />
        <q-tab name="blocked" label="Blockers">
          <q-badge class="q-mt-xs" color="red" floating v-text="blockedBadge" />
        </q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page>
        <q-tab-panels v-model="tab" animated>
          <!-- YESTERDAY -->
          <q-tab-panel class="q-pa-none" name="yesterday">
            <div class="q-pa-lg">
              <div class="text-h6">What did you do yesterday?</div>
            </div>
            <Task
              v-show="yesterdayTasks"
              @edit="edit($event)"
              @done="done($event)"
              :items="yesterdayTasks"
            ></Task>
            <p
              v-show="!isLoading && !yesterdayTasks.length"
              class="q-pa-lg text-grey-5"
            >
              'Daily - Yesterday' explanation
            </p>
          </q-tab-panel>
          <!-- TODAY -->
          <q-tab-panel name="today">
            <div class="q-pa-lg">
              <div class="text-h6">What will you do today?</div>
            </div>
            <Task
              v-show="todayTasks"
              @edit="edit($event)"
              @done="done($event)"
              :items="todayTasks"
            ></Task>
            <p
              v-show="!isLoading && !todayTasks.length"
              class="q-pa-lg text-grey-5"
            >
              'Daily - Today' explanation
            </p>
          </q-tab-panel>
          <!-- BLOCKERS -->
          <q-tab-panel name="blocked">
            <div class="q-pa-lg">
              <div class="text-h6">Any blockers?</div>
            </div>
            <!-- @delete="delete($event, reset())" -->
            <Task
              v-show="blockedTasks"
              @edit="edit($event)"
              @delete="remove($event)"
              @done="done($event)"
              :items="blockedTasks"
            ></Task>
            <p
              v-show="!isLoading && !blockedTasks.length"
              class="q-pa-lg text-grey-5"
            >
              'Daily - Blocker' explanation
            </p>
          </q-tab-panel>
        </q-tab-panels>
        <!-- LOADING -->
        <q-inner-loading :showing="isLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <!-- ADD BUTTON -->
        <q-page-sticky
          v-show="!isLoading"
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            @click="addTaskDialog()"
            size="lg"
            round
            color="secondary"
            icon="add"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>
    <!-- DIALOG - New task -->
    <q-dialog v-model="dialog">
      <q-card style="min-width: 90vw">
        <q-card-section>
          <div class="text-h6">Add new task</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="newTask"
            autofocus
            @keyup.enter="saveNewTask()"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" @click="saveNewTask()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
// Firebase
import { db } from "./../boot/firebase.js";

// Components
import Task from "./../components/Task.vue";

export default {
  components: {
    Task
  },
  data() {
    return {
      tab: "today",
      dialog: false,
      isLoading: Boolean,
      newTask: "",
      tasks: []
    };
  },
  created() {
    this.getTasks();
  },
  computed: {
    yesterdayTasks() {
      return this.tasks.filter(item => item.category === "yesterday");
    },
    todayTasks() {
      return this.tasks.filter(item => item.category === "today");
    },
    blockedTasks() {
      return this.tasks.filter(item => item.category === "blocked");
    },
    blockedBadge() {
      const completedBlockers = this.blockedTasks.filter(
        item => item.isDone === true
      );
      return this.blockedTasks.length - completedBlockers.length;
    }
  },
  methods: {
    // GET - Task
    async getTasks() {
      try {
        this.isLoading = true;
        const results = await db.collection("tasks").get();

        results.forEach(res => {
          let go = {
            id: res.id,
            title: res.data().title,
            isDone: res.data().isDone,
            category: res.data().category
          };
          this.tasks.push(go);
          this.isLoading = false;
        });
      } catch (err) {
        this.$q.notify("Error: ", err);
      }
    },

    // ADD - Task
    addTaskDialog() {
      this.dialog = true;
    },
    async saveNewTask() {
      this.dialog = false;
      try {
        const query = await db.collection("tasks").add({
          title: this.newTask,
          isDone: false,
          category: this.tab
        });
        this.tasks.push({
          id: query.id,
          title: this.newTask,
          isDone: false,
          category: this.tab
        });
        this.newTask = "";
        this.$q.notify("Added new task!");
      } catch (err) {
        this.$q.notify("Error: ", err);
      }
    },

    // EDIT - task
    edit(e) {
      this.$q
        .dialog({
          title: "Edit task",
          prompt: {
            model: e.task.title,
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.saveEdit(e.task.id, data);
        });
    },
    done(e) {
      this.saveEdit(e.id, e.isDone);
    },
    async saveEdit(id, data) {
      try {
        switch (typeof data) {
          // If data type is equal String
          case "string":
            const queryTitle = await db
              .collection("tasks")
              .doc(id)
              .update({
                title: data
              });
            const local_TITLE = this.tasks.filter(item => item.id === id)[0];
            local_TITLE.title = data;
            break;
          default:
            const queryIsDone = await db
              .collection("tasks")
              .doc(id)
              .update({
                isDone: data
              });
            const local_IS_DONE = this.tasks.filter(item => item.id === id)[0];
            local_IS_DONE.isDone = data;
        }
        this.$q.notify({
          progress: true,
          message: "Updated task!",
          icon: "done"
        });
      } catch (err) {
        this.$q.notify("Error: ", err);
      }
    },

    // DELETE - task
    remove(i, reset) {
      console.log(reset);
      this.$q
        .dialog({
          title: "Please confirm",
          message: "Do you want to delete this item?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // this.tasks.splice(i, 1);
          // this.finalize(reset)
          this.timer = setTimeout(() => {
            reset();
          }, 0);
          switch (this.tab) {
            case "today":
              this.today.splice(i, 1);
              break;
            case "yesterday":
              this.yesterday.splice(i, 1);
              break;
            default:
              this.blockers.splice(i, 1);
          }
          this.$q.notify("This item was removed");
        })
        .onCancel(() => {
          this.finalize(reset);
        });
    }
  }
};
</script>

<style lang="scss">
.container {
  height: 100vh;
}
.logo {
  filter: grayscale(50%);
  height: 100%;
  opacity: 0.5;
  z-index: -1;
}
.q-tab-panels {
  height: calc(100vh - 48px);
}
.q-tab-panel {
  padding: 0;
}
</style>