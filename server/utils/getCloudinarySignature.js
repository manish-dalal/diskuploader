import { v2 as cloudinary } from 'cloudinary'
import '../config/cloudinary'

export const getCloudinarySignature = (folder = 'm1') => {
  const apiSecret = cloudinary.config().api_secret
  const cloudName = cloudinary.config().cloud_name
  const apiKey = cloudinary.config().api_key
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder
    },
    apiSecret
  )
  return { timestamp, signature, cloudname: cloudName, apikey: apiKey, folder }
}
