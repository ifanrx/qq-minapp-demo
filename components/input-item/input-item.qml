<view class="input-item">
    <view class="label">{{label}}</view>
    <input
        data-field="{{name}}"
        placeholder="{{placeholder}}"
        type="{{type}}"
        value="{{value}}"
        bindinput="onInput"
    />
    <view class="split-line" hidden="{{last}}"></view>
</view>