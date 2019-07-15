import {showToastSuccess, showToastFail, showModalText, showLoadingText, hideLoading} from '../../utils/interface-feedback'
import {SCHEMA_TABLE, SCHEMA_TABLE_POINTER_COLUMN, POINTER_TABLE, getPointerIds} from '../../utils/constant'
import {stringifyEllipse} from '../../utils/util'
import data from './data'
const app = getApp()

let Product
let pointer_ids = {}

Page({
  data: {
    records: [],
    offset: 0,
    limit: 10,
    sortKey: '',
  },

  onLoad() {
    Product = new app.BaaS.TableObject(SCHEMA_TABLE)
    pointer_ids = getPointerIds()
  },

  createRecords() {
    return Product.createMany(data)
      .then(res => {
        if (res.data.succeed == data.length) {
          console.log('创建数据成功')
        }
      })
      .catch(err => console.log('创建数据失败'))
  },

  deleteAllRecords() {
    const query = new app.BaaS.Query()
    return new Promise((resolve, reject) => {
      const deleteRecord = () => {
        Product.limit(1000).offset(0).delete(query).then(res => {
          if (!!res.data.next) {
            deleteRecord()
          } else {
            resolve()
          }
        }).catch(err => reject(err))
      }
      deleteRecord()
    })
  },

  handleResetData() {
    this.deleteAllRecords()
      .then(this.createRecords)
      .then(() => {
        showToastSuccess()
      })
      .catch(() => {
        showToastFail()
      })
  },

  getAllProduct() {
    showLoadingText()
    Product.find().then(res => {
      this.setData({
        records: res.data.objects,
      })
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      showToastFail()
    }).then(hideLoading)
  },

  getAllProductWithOptions() {
    const {sortKey, offset, limit} = this.data
    Product.offset(offset).limit(limit).orderBy(sortKey).find().then(res => {
      this.setData({
        records: res.data.objects,
      })
    }, err => {
      showToastFail()
    }).then(hideLoading)
  },

  getAllProductWithExpand() {
    Product.expand([SCHEMA_TABLE_POINTER_COLUMN]).find().then(res => {
      this.setData({
        records: res.data.objects,
      })
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      showToastFail()
    }).then(hideLoading)
  },

  handleSelectSortKey(event) {
    const sortKey = event.currentTarget.dataset.sortKey
    this.setData({
      sortKey,
    })
  },

  handleModifyLimit(event) {
    this.setData({
      limit: parseInt(event.detail.value, 10),
    })
  },

  handleModifyOffset(event) {
    this.setData({
      offset: parseInt(event.detail.value, 10),
    })
  },

  getProduct: function () {
    const {records} = this.data
    if (!records.length) return
    showLoadingText()
    Product.get(records[0].id).then(res => {
      hideLoading()
      let result = `查询成功-ID为：${res.data.id}`
      showModalText(result)
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  getProductBySelect_asc: function () {
    const {records} = this.data
    if (!records.length) return
    showLoadingText()
    Product.select('str').get(records[0].id).then(res => {
      hideLoading()
      let result = `查询成功-str：${res.data.str}`
      showModalText(result)
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  getProductBySelect_desc: function () {
    const {records} = this.data
    if (!records.length) return
    showLoadingText()
    Product.select(['-str', '-array_i']).get(records[0].id).then(res => {
      hideLoading()
      let result = `All keys：[${Object.keys(res.data)}]`
      showModalText(result)
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  compareQuery: function (event) {
    let opt = event.currentTarget.dataset.type
    let query = new app.BaaS.Query()
    query.compare('int', opt, 50)
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  containsQuery: function () {
    let query = new app.BaaS.Query()
    query.contains('str', 'm')
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  regxQuery: function (event) {
    let type = event.currentTarget.dataset.type
    let query = new app.BaaS.Query()
    let regx = type === 'str' ? /^a/ : new RegExp(/^q/, 'i')
    query.matches('str', regx)
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  inQuery: function () {
    let query = new app.BaaS.Query()
    query.in('array_s', ['黑', '白'])
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  notInQuery: function () {
    let query = new app.BaaS.Query()
    query.notIn('array_s', ['灰'])
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  arrayContainsQuery: function () {
    let query = new app.BaaS.Query()
    query.arrayContains('array_s', ['黑', '白', '灰'])
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  compareQuery_2: function () {
    let query = new app.BaaS.Query()
    query.compare('array_s', '=', ['a', 'b', 'c', 'd'])
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  nullQuery: function () {
    let query = new app.BaaS.Query()
    query.isNull('int')
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  notNullQuery: function () {
    let query = new app.BaaS.Query()
    query.isNotNull('int')
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  // sdk version >= 1.1.1
  existsQuery: function () {
    let query = new app.BaaS.Query()
    query.exists(['str', 'int'])
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  notExistsQuery: function () {
    let query = new app.BaaS.Query()
    query.notExists('int')
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  complexQueryProduct: function () {
    let query1 = new app.BaaS.Query()
    query1.compare('int', '>', 50)
    let query2 = new app.BaaS.Query()
    query2.isNotNull('str')
    let andQuery = app.BaaS.Query.and(query1, query2)
    let query3 = new app.BaaS.Query()
    query3.in('array_s', ['黑'])
    let orQuery = new app.BaaS.Query.or(andQuery, query3)
    showLoadingText()
    Product.setQuery(orQuery).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  queryByTime1: function () {
    let query = new app.BaaS.Query()
    let startTimestamp = (new Date()).setHours(0, 0, 0, 0) / 1000
    let endTimestamp = startTimestamp + 24 * 60 * 60
    query.compare('created_at', '>=', startTimestamp)
    query.compare('created_at', '<', endTimestamp)
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
      showToastSuccess()
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  queryByTime2: function () {
    let query = new app.BaaS.Query()

    let timestamp = (new Date(2018, 0, 1)).setHours(0, 0, 0, 0)
    query.compare('date', '<=', (new Date(timestamp)).toISOString())
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
      showToastSuccess()
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  selectQuery: function () {
    showLoadingText()
    Product.select(['num']).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
      showToastSuccess()
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  unselectQuery: function () {
    showLoadingText()
    Product.select(['-array_s', '-str', '-file']).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
      showToastSuccess()
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  expandCreated_by: function () {
    showLoadingText()
    Product.expand('created_by').find().then(res => {
      hideLoading()
      showModalText('created_by: ' + stringifyEllipse(res.data.objects[0].created_by))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  getExpand: function () {
    const {records} = this.data
    if (!records.length) return
    showLoadingText()
    Product.expand('created_by').get(records[0].id).then(res => {
      hideLoading()
      showModalText('created_by: ' + stringifyEllipse(res.data.created_by))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  hasKey(){
    let query = new app.BaaS.Query()
    query.hasKey('obj', 'num')
    showLoadingText()
    Product.setQuery(query).find().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res.data.objects))
      showToastSuccess()
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  countItem(){
    let query = new app.BaaS.Query()
    showLoadingText()
    Product.setQuery(query).count().then(res => {
      hideLoading()
      showModalText(stringifyEllipse(res))
    }, err => {
      hideLoading()
      showToastFail()
    })
  },

  pointerQuery(e) {
    let {action} = e.target.dataset
    let query = new app.BaaS.Query()
    if (action === 'exist') {
      query.exists(SCHEMA_TABLE_POINTER_COLUMN)
    } else if (action === 'compare') {
      query.compare(SCHEMA_TABLE_POINTER_COLUMN, '=', new app.BaaS.TableObject(POINTER_TABLE).getWithoutData(pointer_ids.pointer_id))
    } else if (action === 'in') {
      let Order = new app.BaaS.TableObject(POINTER_TABLE)
      query.in(SCHEMA_TABLE_POINTER_COLUMN, [Order.getWithoutData(pointer_ids.pointer_id), Order.getWithoutData(pointer_ids.pointer_id2)])
    } else if (action === 'notIn') {
      let Order = new app.BaaS.TableObject(POINTER_TABLE)
      query.notIn(SCHEMA_TABLE_POINTER_COLUMN, [Order.getWithoutData(pointer_ids.pointer_id), Order.getWithoutData('fakeid123')])
    }

    showLoadingText()
    Product.setQuery(query).expand(SCHEMA_TABLE_POINTER_COLUMN).find().then(res => {
      showModalText(stringifyEllipse(res.data.objects))
      hideLoading()
    }, err => {
      hideLoading()
      showToastFail()
    })
  }
})
