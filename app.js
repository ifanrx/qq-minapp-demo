import {BAAS_CLIENT_ID} from './env.js'

//app.js
App({
  onLaunch() {
    this.initBaaS()
  },

  initBaaS() {
      this.BaaS = require('./vendor/sdk-qq.2.2.1.js')
      this.BaaS.init(BAAS_CLIENT_ID)
  }
})
