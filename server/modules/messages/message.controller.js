import axios from 'axios'
import { getModel } from './message.model'
import { getCloudinarySignature } from '../../utils/getCloudinarySignature'

const messages = {}

messages.index = async (req, res) => {
  try {
    const {
      imgDriveId = '',
      text = '',
      category = '',
      cname = 'v1',
      linkType = 'mdisk',
      pageSize = '100',
      page = '0'
    } = req.query

    const params = {}
    if (category) {
      params.category = category
    }
    if (imgDriveId) {
      params.imgDriveId = imgDriveId
    }
    if (text) {
      params.text = { $regex: new RegExp(text, 'i') }
    }
    let collectionName = `${cname}_${linkType}_messages`
    const messageModel = getModel(collectionName)
    const totalMessages = await messageModel.countDocuments(params)
    const parsedPage = parseInt(page)
    const parsedPagesize = parseInt(pageSize)
    const skipDoc = parsedPagesize * parsedPage
    const messagesArr = await messageModel
      .find(params, { imgDriveId: 1, text: 1, category: 1, cloudinaryUrl: 1 })
      .skip(skipDoc)
      .limit(parsedPagesize)

    return res.json({
      totalpages: JSON.stringify(Math.ceil(totalMessages / parsedPagesize)),
      messages: messagesArr
    })
  } catch (error) {
    console.log('error', error)
    return { error: error.toString() }
  }
}

messages.updateCloudinary = async (req, res) => {
  try {
    const { category = '', cname = 'v1', linkType = 'mdisk', pageSize = '40' } = req.query

    const params = {
      imgDriveId: { $nin: ['', null] },
      cloudinaryUrl: { $in: ['', null] }
    }
    if (category) {
      params.category = category
    }
    let collectionName = `${cname}_${linkType}_messages`
    const messageModel = getModel(collectionName)
    const parsedPagesize = parseInt(pageSize)
    const messagesArr = await messageModel
      .find(params, { imgDriveId: 1, _id: 1, cloudinaryUrl: 1 })
      .limit(parsedPagesize)

    for (const myDoc of messagesArr || []) {
      const sigData = getCloudinarySignature()
      if (myDoc.imgDriveId && sigData.apikey) {
        try {
          const formData = new URLSearchParams()
          formData.append('file', `https://drive.google.com/uc?export=view&id=${myDoc.imgDriveId}`)
          formData.append('api_key', sigData.apikey)
          formData.append('timestamp', sigData.timestamp)
          formData.append('signature', sigData.signature)
          formData.append('folder', sigData.folder)
          const url = 'https://api.cloudinary.com/v1_1/' + sigData.cloudname + '/auto/upload'
          const { data = {} } = await axios.post(url, formData)
          console.log(`${messagesArr.indexOf(myDoc) + 1} data`, JSON.stringify(data))
          const cloudinaryUrl = data.secure_url
          await messageModel.findOneAndUpdate({ _id: myDoc._id }, { $set: { cloudinaryUrl } })
          myDoc.cloudinaryUrl = data.secure_url
        } catch (error1) {
          console.log('myDoc', myDoc._id)
          console.log('error1', error1)
        }
      }
    }
    return res.json({
      messages: messagesArr
    })
  } catch (error) {
    console.log('error', error)
    return { error: error.toString() }
  }
}

export { messages }
