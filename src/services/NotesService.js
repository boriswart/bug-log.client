import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotes(id) {
    try {
      let res = null
      res = await api.get('/api/bugs/' + id + '/notes')

      AppState.notes = res.data
      logger.log('Check getNotes', res.data)
    } catch (err) {
      logger.error('Problem in NotesService getNotes', err)
    }
  }

  async createNote(data) {
    try {
      logger.log('createNote', data)
      let res = null
      res = await api.post('/api/notes', data)
      logger.log(res.data)
      // AppState.Notes = res.data
    } catch (err) {
      logger.error('Problem in NotesService createNote', err)
    }
  }

  async deleteNote(id, data) {
    try {
      let res = null
      res = await api.delete('/Notes/' + id, data)

      logger.log(res.data)
      // AppState.Notes = res.data
      logger.log('Delete Notes', res.data)
    } catch (err) {
      logger.error('Problem in NotesService Delete Note', err)
    }
  }
}

export const notesService = new NotesService()
