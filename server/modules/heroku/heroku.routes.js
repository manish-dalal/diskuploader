import express from 'express'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { heroku } from './heroku.controller'

const herokuRoutes = express.Router()
herokuRoutes.get('/', asyncWrapper(heroku.update))

export { herokuRoutes }
