Page({
  /**
   * @param e
   */
  navigateTo(e) {
    const {url} = e.target.dataset
    qq.navigateTo({
      url
    })
  },
})
