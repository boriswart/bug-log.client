<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 m-auto d-flex">
        <div v-if="activeBug!=={}" class="card mt-5" style="max-width: 560px;">
          <div class="row g-0">
            <div v-if="activeBug.creatorId" class="col-md-4">
              <img :src="activeBug.creatorId.picture" class="rounded-pill" alt="nogetty">
            </div>
            <div v-else class="col-md-4 p-2">
              <img :src="activeBug.creatorId" class="rounded-pill py-2" alt="nogetty">
            </div>
            <div class="col-md-8">
              <h5 class="card-title">
                {{ activeBug.title }}
              </h5>
              <div v-if="activeBug.creatorId" class="card-body">
                {{ activeBug.creatorId.email }}
                <p class="card-text">
                  {{ activeBug.description }}
                </p>
                <p class="card-text">
                  email(name):
                  {{ activeBug.creatorId.name }}
                </p>
                <p class="card-text">
                  created:
                  <small class="text-muted">
                    {{ activeBug.createdAt.split('T')[0].split('-').splice(1,2)[0] }}
                    {{ activeBug.createdAt.split('T')[0].split('-').splice(1,2)[1] }}
                    {{ (activeBug.createdAt.split('T')[0].split('-').splice(0,1))[0] }}</small>
                </p>
                <p class="card-text">
                  updated:
                  <small class="text-muted">
                    {{ activeBug.updatedAt.split('T')[0].split('-').splice(1,2)[0] }}
                    {{ activeBug.updatedAt.split('T')[0].split('-').splice(1,2)[1] }}
                    {{ (activeBug.updatedAt.split('T')[0].split('-').splice(0,1))[0] }}</small>
                </p>
                <button class="btn btn-danger" @click="deleteBug()">
                  Del
                </button>
              </div>
            </div>
          </div>
          <div v-for="note in notes" :key="note.id">
            {{ note.body }} {{ note.creatorId.name }} {{ note.creatorId.picture }}
          </div>
        </div>
        <form @submit.prevent="createNote()">
          <div class="d-flex w-100 mr-5 pr-5 align-items-right">
            <textarea class="form-control" v-model="state.newNote.body" required="true" placeholder="add new Note"></textarea>
            <!-- <input type="text" class="form-control" required="true" placeholder="Add new Note.." v-model="state.newNote.body"> -->
            <button type="submit"
                    class="btn"
                    :disabled="!state.newNote "
                    :class="{
                      'btn-primary': state.newNote.body,
                      'btn-danger': !state.newNote.body
                    }"
            >
              Report:
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export default {
  setup() {
    const route = useRoute()
    watchEffect(() => {
      bugsService.getBugDetails(route.params.id)
      notesService.getNotes(AppState.activeBug.id)
    })
    const state = reactive({
      newNote: { bug: {}, body: '' }
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes),
      activeBug: computed(() => AppState.activeBug),
      getBugDetails() {
        bugsService.getBugDetails(route.params.id)
      },
      createNote() {
        state.newNote.bug = AppState.activeBug
        notesService.createNote(state.newNote)
      },
      deleteBug() {
        bugsService.deleteBug(route.params.id)
      }
    }
  }
}

</script>

<style>
</style>
