import mongoose from 'mongoose'
const { Schema } = mongoose

const messageSchema = new Schema(
  {
    _partition: { type: String },
    imgDriveId: { type: String, required: true },
    text: { type: String, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
)

const messageModel = mongoose.model('v1_dood_messages', messageSchema)

let models = {}
const getModel = (collectionName) => {
  if (!(collectionName in models)) {
    models[collectionName] = mongoose.model(collectionName, messageSchema)
  }
  return models[collectionName]
}

export { messageModel, getModel }
