<!-- 这是自定义组件的内部QML结构 -->
<view class="list-item" bindtap="onTap">
    <view class="content">
        <slot></slot>
    </view>
    <view class="arrow" hidden="{{! arrow}}"></view>
    <view class="bottom-line" hidden="{{last}}"></view>
</view>
