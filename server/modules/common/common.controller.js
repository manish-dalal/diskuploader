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
    // if (error.response) {
    //   // Request made and server responded
    //   reject(response);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   reject(response);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   reject(response);
    // }
    return res.json({ error: error.response.data })
  }
}

export { common }
