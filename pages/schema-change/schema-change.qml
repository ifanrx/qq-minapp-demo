<view class="page-container">
  <card>
    <text qq:if="{{record}}" class="card-title">id : {{record.id}}</text>
    <text qq:else class="card-title">请先创建一条记录，再进行下一步操作</text>
    <button type="primary" bindtap="createRecord">添加记录</button>
    <button type="primary" disabled="{{!record}}" class="f-margin-bottom-0" bindtap="deleteRecord">删除记录</button>
  </card>

  <card>
    <text class="card-title">更新字段 -- pointer</text>
    <button type="primary" disabled="{{!record}}" class="f-margin-bottom-0" bindtap="updatePointer">updatePointer</button>
  </card>

  <card>
    <text class="card-title">更新字段 -- int : {{record.int}}</text>
    <button type="primary" disabled="{{!record}}" bindtap="updateRecord">int = 100</button>
    <button type="primary" disabled="{{!record}}" bindtap="minusOne">int -= 1</button>
    <button type="primary" disabled="{{!record}}" class="f-margin-bottom-0" bindtap="plusOne">int += 1</button>
  </card>

  <card>
    <text class="card-title">更新字段 -- array_int : [{{record.array_i}}]</text>
    <button type="primary" disabled="{{!record}}" data-value="{{[123, 456]}}" bindtap="addItem">add [123, 456]</button>
    <button type="primary" disabled="{{!record}}" data-value="{{123456}}" bindtap="addItem">add 123456</button>
    <block qq:if="{{record && record.array_i.length > 1}}">
      <button type="primary" data-value="{{[record.array_i[0], record.array_i[1]]}}" bindtap="removeItem">remove [{{record.array_i[0]}}, {{record.array_i[1]}}]</button>
      <button class="f-margin-bottom-0" type="primary" data-value="{{record.array_i[0]}}" bindtap="removeItem">remove {{record.array_i[0]}}</button>
    </block>
    <block qq:elif="{{record && record.array_i.length === 1}}">
      <button type="primary" disabled >remove [  ]</button>
      <button class="f-margin-bottom-0" type="primary" data-value="{{record.array_i[0]}}" bindtap="removeItem">remove {{record.array_i[0]}}</button>
    </block>
    <block qq:else>
      <button type="primary" disabled >remove [  ]</button>
      <button class="f-margin-bottom-0" type="primary" disabled >remove </button>
    </block>
  </card>

  <card>
    <text class="card-title">更新字段 -- obj.num : {{record.obj.num}}</text>
    <button class="f-margin-bottom-0" type="primary" disabled="{{!record}}" bindtap="patchObject">patchObject</button>
  </card>

  <card>
    <text class="card-title">更新字段 -- unset</text>
    <button type="primary" disabled="{{!record}}" bindtap="unsetUseObjParam">unset use object param</button>
    <button class="f-margin-bottom-0" type="primary" disabled="{{!record}}" bindtap="unsetUseStrParam">unset use string param</button>
  </card>

</view>
