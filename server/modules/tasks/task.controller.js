import { taskModel } from './task.model'
import { httpStatus } from '../../utils/httpStatus'

const tasks = {}
tasks.index = async (req, res) => {
  const { botToken } = req.query
  let tasks = await taskModel.find({ botToken })
  return res.json({ tasks })
}

tasks.create = async (req, res) => {
  let data = await taskModel.create(req.body)
  return res.status(httpStatus.CREATED).json({ data })
}

tasks.update = async (req, res) => {
  let task = await taskModel.findById(req.params.id)
  if (!task) return res.status(httpStatus.BAD_REQUEST).json({ message: 'Task not found' })
  Object.assign(task, req.body)
  await task.save()
  return res.json({ message: 'Record updated' })
}

export { tasks }
