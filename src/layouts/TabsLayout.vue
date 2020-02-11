<template>
  <q-layout view="lHh lpr lFf" container class="shadow-2 container">
    <q-header elevated>

      <q-tabs v-model="tab">
        <q-tab name="yesterday" label="Yesterday" />
        <q-tab name="today" label="Today" />
        <q-tab name="blockers" label="Blockers">
          <q-badge class="q-mt-xs" color="red" floating>1</q-badge>
        </q-tab>
      </q-tabs>

    </q-header>

    <q-page-container>
      <q-page class="">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel class="q-pa-none" name="yesterday">
            <div class="q-pa-lg">
              <div class="text-h6">What did you do yesterday?</div>
            </div>
            <Task @edit="edit($event)" :items="yesterday"></Task>
          </q-tab-panel>

          <q-tab-panel name="today">
            <div class="q-pa-lg">
              <div class="text-h6">What will you do today?</div>
            </div>
            <Task @edit="edit($event)" :items="today"></Task>
          </q-tab-panel>

          <q-tab-panel name="blockers">
            <div class="q-pa-lg">
              <div class="text-h6">Any blockers?</div>
              <span class="text-grey-6">There are impediments in your way</span>
            </div>
              <!-- @delete="delete($event, reset())" -->
            <Task
              @edit="edit($event)"
              @delete="remove($event)"
              :items="blockers"
            ></Task>
          </q-tab-panel>
        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn @click="dialog = true" size="md" round color="secondary" icon="live_help" />
        </q-page-sticky>
      </q-page>
    </q-page-container>

    <Dialog :show="dialog" @close="close($event)"></Dialog>

  </q-layout>
</template>

<script>
import Dialog from "./../components/Dialog.vue";
import Task from "./../components/Task.vue";

export default {
  components: {
    Dialog,
    Task
  },
  data () {
    return {
      tab: "today",
      dialog: false,
      yesterday: [],
      today: [
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
      ],
      blockers: [
        {
          title: "Bloqueado mal",
          done: false
        }
      ]
    }
  },
  methods: {
    // DIALOG
    close(val) {
      this.dialog = val
    },

    // TASKS

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
          switch(this.tab) {
            case "today":
              this.today[e.i].title = data;
              break;
            case "yesterday":
              this.yesterday[e.i].title = data;
              break;
            default:
              this.blockers[e.i].title = data;
          }
        });
    },
    // Delete task
    remove(i, reset) {
      console.log(reset)
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
            reset()
          }, 0)
          switch(this.tab) {
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
          this.finalize(reset)
        });
    },
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
.q-tab-panel {
  padding: 0;
}
</style>

