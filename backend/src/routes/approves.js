import { Router } from 'express'
import { listConfirmed, bybuyer } from '../services/approves'

export default () => {
  let api = Router()

  api.get('/:owner/:data_id', listConfirmed)
  api.get('/:buyer', bybuyer)

  return api
}
