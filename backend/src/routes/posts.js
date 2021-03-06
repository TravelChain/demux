import { Router } from 'express'
import { listConfirmed, byowner } from '../services/post'

export default () => {
  let api = Router()

  api.get('/:owner/:data_id', listConfirmed)
  api.get('/:owner', byowner)

  return api
}
