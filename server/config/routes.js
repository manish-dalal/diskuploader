import express from 'express'
import multer from 'multer'
import axios from 'axios'
import { userRoutes } from '../modules/users/user.routes'
import { authRoutes } from '../modules/auth/auth.routes'
import { httpStatus } from '../utils/httpStatus'
import { diskStorage, limits, s3Storage, imageFileFilter } from '../utils/fileupload'
import { commonRoutes } from '../modules/common/common.routes'
const Router = express.Router()

Router.all('/health-check', (req, res) => {
  console.log('API /health-check')
  return res.json({ message: 'OK' })
})
Router.all('/keepalive', async (req, res) => {
  console.log('API /keepalive', req.headers.host)
  try {
    console.log('req URL', `https://${req.headers.host}/ping`)
    const res1 = await axios.get(`https://${req.headers.host}/ping`)
    console.log('keepalive res', res1.response)
  } catch (error) {
    console.log('keepalive error', JSON.stringify(error))
  }
  return res.json({ message: 'OK' })
})

Router.use('/users', userRoutes)
Router.use('/auth', authRoutes)
Router.use('/msc', commonRoutes)

Router.post('/fileupload', multer({ storage: diskStorage, limits, fileFilter: imageFileFilter }).single('avatar'), (req, res) => {
  if (!req.file) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please select file' })
  return res.json({ data: req.file })
})

Router.post('/s3fileupload', multer({ storage: s3Storage, limits, fileFilter: imageFileFilter }).single('avatar'), (req, res) => {
  if (!req.file) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please select file' })
  return res.json({ data: req.file })
})

export { Router }
