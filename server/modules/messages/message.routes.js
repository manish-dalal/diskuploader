import express from 'express'
import { messages } from './message.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'

const messageRoutes = express.Router()

messageRoutes.get('/list', asyncWrapper(messages.index))

export { messageRoutes }
