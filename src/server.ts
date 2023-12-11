import app from './app'
import config from './app/config'

import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.MONGO_URI as string)
    app.listen(config.PORT, () => {
      console.log(`ph-university app listening on port ${config.PORT}`)
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.log(err)
  }
}

main()
