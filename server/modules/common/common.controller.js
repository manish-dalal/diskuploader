import axios from 'axios'

const common = {}

common.post = async (req, res) => {
  try {
    const { url, body } = req.body
    const { data = {} } = await axios.post(url, body)
    return res.json({ data })
  } catch (error) {
    return res.json({ error: error.response.data })
  }
}

common.get = async (req, res) => {
  try {
    const { data = {} } = await axios.get(req.query.url)
    return res.json({ data })
  } catch (error) {
    return res.json({ error: error.response.data })
  }
}

export { common }
