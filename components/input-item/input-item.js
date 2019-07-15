Component({
  properties: {
    label: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    placeholder: {
      type: String,
      value: ''
    },
    last: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onInput(e) {
      this.setData({
        value: e.detail.value
      })

      this.triggerEvent('inputchange', {
        value: this.data.value
      })
    }
  }
})