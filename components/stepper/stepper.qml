<view  class="stepper">
    <view class="item btn btn-minus" bindtap="onBtnClick" data-operator="-"></view>
    <input class="item input" type="{{type}}" bindinput="onInput" value="{{value}}" />
    <view class="item btn btn-plus" bindtap="onBtnClick" data-operator="+"></view>
</view>