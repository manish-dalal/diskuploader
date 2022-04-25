import express from 'express'
import { tasks } from './task.controller'
import { asyncWrapper } from '../../utils/asyncWrapper'

const taskRoutes = express.Router()

taskRoutes.get('/list', asyncWrapper(tasks.index))
taskRoutes.post('/', asyncWrapper(tasks.create))
taskRoutes.put('/:id', asyncWrapper(tasks.update))

export { taskRoutes }
