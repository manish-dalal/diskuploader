import mongoose from 'mongoose'
const { Schema } = mongoose

const taskSchema = new Schema(
  {
    botToken: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String, required: true },
    page: { type: String, required: true },
    groupId: { type: String, required: true },
    channelName: { type: String, required: true },
    collectionName: { type: String, required: true },
    status: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    lastExecuted: { type: Date }
  },
  { timestamps: true }
)

const taskModel = mongoose.model('tasks', taskSchema)

export { taskModel }
