import axios from 'axios'
const heroku = {}

heroku.update = async (req, res) => {
  try {
    const { n, v } = req.query
    const parsedV = parseInt(v)
    if (process.env.HEROKU_TOKEN && n) {
      const headers = {
        Accept: 'application/vnd.heroku+json; version=3',
        Authorization: `Bearer ${process.env.HEROKU_TOKEN}`
      }
      const { data: formationData } = await axios.get(`https://api.heroku.com/apps/${n}/formation`, { headers })
      if (formationData[0].id) {
        const reqData = {
          quantity: parsedV,
          size: formationData[0].size,
          type: formationData[0].type
        }
        const { data: updatedData } = await axios.patch(
          `https://api.heroku.com/apps/${n}/formation/${formationData[0].id}`,
          reqData,
          { headers }
        )
        return res.send(`<div style="display: flex;align-items: center;justify-content: center;flex-direction: column;padding: 40px;">
        <h1 style="font-weight: bold;word-break: break-all;font-size: 70px;">Bot status: ${parsedV ? 'ON' : 'OFF'}</span></h1>
        <pre><code>${JSON.stringify(updatedData, undefined, 2)}</code></pre>
      </div>`)
      } else {
        return res.json({ error: 'Pass valid n value' })
      }
    } else {
      return res.json({ error: 'Pass heroku details' })
    }
  } catch (error) {
    return res.json({ error: error.response.data })
  }
}

export { heroku }
