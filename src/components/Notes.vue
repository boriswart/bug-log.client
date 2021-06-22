<template>
  <div v-if="state.notes">
    <div class="d-flex border" v-for="note in state.notes" :key="note.id">
      <div class="col-3">
        <img
          class="rounded-pill"
          style="height: 30px"
          :src="note.creator.picture"
          alt="nogetty"
        />
      </div>
    </div>
    {{ note.creator.email }}
    {{ note.body }}
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    // onMounted(() => { notesService.getNotes() })
    // watchEffect(() => {
    //   bugsService.getBugDetails(route.params.id)
    if (route.params.id) notesService.getNotes(route.params.id)

    const state = reactive({
      newNote: { bug: {}, body: '' },
      notes: computed(() => AppState.notes)
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes)
    }
  }
}
</script>

<style>
</style>
