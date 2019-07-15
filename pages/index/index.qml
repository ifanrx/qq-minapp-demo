<view>
  <view class="banner">
    <image src="../../assets/images/logo.png" mode="aspectFit" />
    <text>知晓云 SDK 官方示例</text>
  </view>
  <list>
    <list-item
      arrow="{{true}}"
      bind:click="navigateTo"
      data-url="../auth/auth"
    >
      <view>登入 & 登出</view>
    </list-item>
    <list-item
      arrow="{{true}}"
      bind:click="navigateTo"
      data-url="../schema-change/schema-change"
    >
      <view>schema 增删改测试</view>
    </list-item>
    <list-item
      arrow="{{true}}"
      bind:click="navigateTo"
      data-url="../schema-query/schema-query"
    >
      <view>schema 查找测试</view>
    </list-item>
    <list-item
      arrow="{{true}}"
      bind:click="navigateTo"
      data-url="../invoke-function/invoke-function"
      last="{{true}}"
    >
      <view>触发云函数</view>
    </list-item>
  </list>
</view>