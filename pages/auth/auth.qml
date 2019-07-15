<view class="page-container">
  <view class="status-panel">
    <view class="status-info">
      <view>
        <text>当前登录状态 : </text>
        <text qq:if="{{isUserLogined}}" style="color: green;">{{' 已登录'}}</text>
        <text qq:else style="color: red;">{{' 未登录'}}</text>
      </view>
      <view>
        <text>QQ账号绑定状态 : </text>
        <text qq:if="{{qqLinkStatus == 0}}">{{' 未知'}}</text>
        <text qq:elif="{{qqLinkStatus == 1}}" style="color: green;">{{' 已绑定'}}</text>
        <text qq:else style="color: red;">{{' 未绑定'}}</text>
      </view>
    </view>
    <block qq:if="{{isUserLogined}}">
      <view qq:if="{{name && avatar}}" class="user-info">
        <image class="user-info-avatar" src="{{avatar}}" />
        <view class="user-info-name">{{name}}</view>
      </view>
      <button qq:if="{{qqLinkStatus == 0}}" type="primary" class="f-margin-bottom-0" bindtap="getCurrentUser">获取当前用户对象</button>
    </block>
    <block qq:if="{{qqLinkStatus == -1}}">
      <button type="primary" bindtap="linkQQ">关联QQ账号（静默登录）</button>
      <button type="primary"  open-type="getUserInfo" bindgetuserinfo="forceLinkQQ"  class="f-margin-bottom-0">关联QQ账号（强制登录）</button>
    </block>
  </view>

  <card>
    <text class="card-title">注册</text>
    <view class="card-comments">
      <view>my.BaaS.auth.register({username, password})</view>
      <view>通过邮箱（或用户名）和密码创建用户，之后可以在各个平台登录</view>
    </view>
    <input-item
      label="账号"
      name="name"
      placeholder="请输入用户名"
      type="text"
      value="{{registerName}}"
      bind:inputchange="bindRegisterName"
    />
    <input-item
      label="密码"
      name="password"
      placeholder="请输入密码"
      type="password"
      value="{{registerPassword}}"
      bind:inputchange="bindRegisterPassword"
      last="{{true}}"
    />
    <button type="primary" class="f-margin-bottom-0" bindtap="register">注册</button>
  </card>

  <card>
    <text class="card-title">登录</text>
    <view class="card-comments">
      <view>my.BaaS.auth.login({username, password})</view>
      <view>使用用户名（或邮箱）和密码登录</view>
    </view>
    <input-item
      label="账号"
      name="name"
      placeholder="请输入用户名"
      type="text"
      value="{{loginName}}"
      bind:inputchange="bindLoginName"
    />
    <input-item
      label="密码"
      name="password"
      placeholder="请输入密码"
      type="password"
      value="{{loginPassword}}"
      bind:inputchange="bindLoginPassword"
      last="{{true}}"
    />
    <button type="primary" class="f-margin-bottom-0" bindtap="login">账号邮箱登录</button>
  </card>

  <card>
    <text class="card-title">QQ登录</text>
    <view class="card-comments">
      <view>my.BaaS.auth.loginWithQQ()</view>
      <view>QQ一键登录</view>
    </view>
    <button type="primary" bindtap="qqSilentLogin">静默登录</button>
    <button type="primary" open-type="getUserInfo" bindgetuserinfo="qqForceLogin" class="f-margin-bottom-0">强制登录</button>
  </card>

  <card>
    <text class="card-title">登出</text>
    <button type="primary" bindtap="signout">登出</button>
  </card>

<!--  只有通过验证的邮箱才能使用忘记密码功能 -->
<!--  <card>-->
<!--    <text class="card-title">忘记密码</text>-->
<!--    <button type="primary" class="f-margin-bottom-0" bindtap="resetPassword">忘记密码</button>-->
<!--  </card>-->
</view>
