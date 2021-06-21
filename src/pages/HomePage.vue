<template>
  <div class="m-auto flex-grow-1 flex-column align-items-center justify-content-center">
    <div class="container border">
      <div class="row">
        <form @submit.prevent="createBug">
          <div class="d-flex w-100 mr-5 pr-5 align-items-center">
            <input type="text" class="form-control" required="true" placeholder="Report new bug.." v-model="state.newBug.title">
            <input type="text" class="form-control" required="true" placeholder="description.." v-model="state.newBug.description">
            <button type="submit"
                    class="btn"
                    :disabled="!state.newBug "
                    :class="{
                      'btn-primary': state.newBug.title,
                      'btn-danger': !state.newBug.title
                    }"
            >
              Report:
            </button>
          </div>
        </form>
      </div>
      <div class="row row-cols-4 border text-light bg-dark">
        <div class="col">
          Title
        </div>
        <div class="col">
          Reported By
        </div>
        <div class="col">
          Status
        </div>
        <div class="col">
          Last Modified
        </div>
      </div>
      <!-- <router-link :to="{name: 'BugDetails', params: { id: bug.id } }">
        <p>This is a link to BugDetails</p>
      </router-link> -->
      <div v-if="bugs">
        <div v-for="bug in bugs" :key="bug.id" class="d-flex border">
          <div class="row row-cols-4 justify-content-center" style="color: var(--dark)">
          </div>
          <router-link :to="{name: 'bug-details', params: { id: bug.id } } ">
            <div class="col">
              {{
                bug.title
              }}
            </div>
          </router-link>
          <div v-if="bug.creatorId" class="col">
            {{ bug.creatorId.name }}
          </div>
          <div v-if="bug.closed" class="col" style="color: var(--danger);">
            <b>
              {{ bug.closed?'Closed':'Open' }}
            </b>
          </div>
          <div v-else class="col" style="color: var(--dark);">
            <b>
              {{ bug.closed?'Closed':'Open' }}</b>
          </div>
          <div class="col">
            {{ bug.createdAt.split('T')[0].split('-').splice(1,2)[0] }}
            {{ bug.createdAt.split('T')[0].split('-').splice(1,2)[1] }}
            {{ (bug.createdAt.split('T')[0].split('-').splice(0,1))[0] }}
          </div>
          <!-- <div class="col delete button">
            <button class="btn btn-danger" @click="deleteBug(bug.id)">
              Del
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { router } from '../router'
// import Notification from '../utils/Notification'
export default {
  setup() {
    bugsService.getBugs()
    const state = reactive({
      newBug: { title: '', description: '' },
      activeBug: AppState.activeBug
    })
    return {
      state,
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      activeBug: computed(() => AppState.activeBug),

      createBug() {
        AppState.newBug = state.newBug
        bugsService.createBug(AppState.newBug)
        router.push({ name: 'bug-details', params: state.activeBug.id })
      },
      editBug(id) {
        bugsService.updateBug()
      },
      deleteBug(id) {
        bugsService.deleteBug()
      }
    }
  }
}
</script>

<style>
/* .flexbox .red {
  /* width: 20%;
  color:  #c05a5a;
} */
</style>
