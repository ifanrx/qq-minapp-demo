<view class="page-container">

  <card>
    <image src="../../assets/images/hello.png" mode='widthFix' />
    <text class="card-title">云函数：helloWorld</text>
    <button type="primary" bindtap="helloWorld" class="f-margin-bottom-0">helloWorld</button>
  </card>

  <card>
    <image src="../../assets/images/area.png" mode='widthFix' />
    <text class="card-title">云函数：计算三角形面积</text>
    <input-item
      label="底边长"
      name="length"
      placeholder="请输入三角形底边长"
      type="number"
      value="{{length}}"
      bind:inputchange="bindLengthChanged"
    />
    <input-item
      label="高度"
      name="height"
      value="{{height}}"
      type="number"
      placeholder="请输入三角形的高"
      last="{{true}}"
      bind:inputchange="bindHeightChanged"
    />
    <button type="primary" class="f-margin-bottom-0" bindtap="calculateArea">calculateArea</button>
  </card>
</view>