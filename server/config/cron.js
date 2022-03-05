import cron from 'node-cron'

cron.schedule('*/4 * * * *', () => {
  // runs every 4 minute
  console.log('started at: ' + new Date().toLocaleString())
})
