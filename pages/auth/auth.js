import {showToastSuccess, showToastFail, showLoading, showLoadingText} from '../../utils/interface-feedback'
const app = getApp()

Page({
  data: {
    name: '',
    avatar: '',
    registerName: '',
    registerPassword: '',
    loginName: '',
    loginPassword: '',
    isUserLogined: false,
    qqLinkStatus: 0,
    currentUser: null
  },

  onLoad() {
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const uid = app.BaaS.storage.get('uid')
    const token = app.BaaS.storage.get('auth_token')
    this.setData({
      isUserLogined: uid && token,
    })
  },

  cleanSession() {
    console.log('------- clean session start -------')
    app.BaaS.storage.set('uid', '')
    app.BaaS.storage.set('auth_token', '')
    app.BaaS.storage.set('session_expires_at', '')
    console.log('------- clean session end -------')
  },

  register() {
    showLoadingText('请稍候...')
    app.BaaS.auth.register({
      username: this.data.registerName,
      password: this.data.registerPassword,
    }).then((res) => {
      showToastSuccess()
    }, err => {
      showToastFail('注册失败')
      console.dir(err)
    })
  },

  bindRegisterName(e) {
    this.setData({
      registerName: e.detail.value,
    })
  },

  bindRegisterPassword(e) {
    this.setData({
      registerPassword: e.detail.value,
    })
  },

  login() {
    showLoadingText('请稍候...')
    this.cleanSession()
    app.BaaS.auth.login({
      username: this.data.loginName,
      password: this.data.loginPassword,
    }).then(user => {
      this.checkLoginStatus()
      showToastSuccess()
    }, err => {
      showToastFail('登录失败')
      console.log(err)
    })
  },

  bindLoginName(e) {
    this.setData({
      loginName: e.detail.value,
    })
  },

  bindLoginPassword(e) {
    this.setData({
      loginPassword: e.detail.value,
    })
  },

  signout() {
    app.BaaS.auth.logout().then((res) => {
      showToastSuccess()
      this.checkLoginStatus()
      this.setData({
        name: '',
        avatar: '',
        qqLinkStatus: 0,
      })
    }, err => {
      showToastFail()
      console.log(err)
    })
  },

  getCurrentUser() {
    app.BaaS.auth.getCurrentUser().then(user => {
      this.setData({
        currentUser: user
      })

      const userInfo = user.toJSON()
      console.log(userInfo)

      if (! userInfo._provider.qq_miniapp) {
        this.setData({
          qqLinkStatus: -1,
        })
      } else {
        this.setData({
          // 静默登录时 qq_miniapp 对象没有 nickname / avatar，setData 不允许设置值为 undefined
          name: userInfo._provider.qq_miniapp.nickname || '',
          avatar: userInfo._provider.qq_miniapp.avatar || '',
          qqLinkStatus: 1,
        })
      }
    })
  },

  resetPassword() {
    app.BaaS.auth.requestPasswordReset().then((res) => {
      showToastSuccess()
    }, err => {
      showToastFail()
      console.log(err)
    })
  },

  qqSilentLogin() {
    this.cleanSession()
    app.BaaS.auth.loginWithQQ().then((res) => {
      this.checkLoginStatus()
      console.log(res, res.toJSON())
      showToastSuccess()
    }, err => {
      showToastFail('静默登录失败')
      console.log(err)
    })
  },

  qqForceLogin(data) {
    this.cleanSession()
    console.log(data)

    app.BaaS.auth.loginWithQQ(data)
        .then(res => {
          this.checkLoginStatus()
          console.log(res)
          showToastSuccess()
        })
        .catch(err => {
          showToastFail('授权登录失败')
          console.log(err)
        })
  },

  linkQQ() {
    const User = new app.BaaS.User
    const currentUser = User.getCurrentUserWithoutData()
    currentUser.linkQQ()
      .then(res => {
        showToastSuccess()
        this.setData({
          qqLinkStatus: 0,
        })
      })
      .catch(err => {
        showToastFail()
        console.log(err)
      })
  },

  forceLinkQQ(data) {
    const currentUser = this.data.currentUser

    currentUser.linkQQ(data)
      .then(res => {
        showToastSuccess()
        this.setData({
          qqLinkStatus: 0,
        })
      })
      .catch(err => {
        showToastFail()
        console.log(err)
      })
  }
})

