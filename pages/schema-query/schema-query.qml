<view class="page-container">
  <!-- <view class="page-title">Schema 查找测试</view> -->

  <card>
    <text class="card-title">重置数据</text>
    <button type="primary" class="f-margin-bottom-0" bindtap="handleResetData">重置</button>
  </card>

  <card>
    <text class="card-title">get 查询</text>
    <button type="primary" bindtap="getAllProduct">获取所有产品</button>
    <block qq:if="{{!records.length}}">
      <button type="primary" disabled>获取一个产品</button>
      <button type="primary" disabled>获取一个产品返回字段'str'</button>
      <button type="primary" class="f-margin-bottom-0" disabled>获取一个产品不返回字段'str, array_i'</button>
    </block>
    <block qq:else>
      <button type="primary" bindtap="getProduct">获取一个产品</button>
      <button type="primary" bindtap="getProductBySelect_asc">获取一个产品返回字段'str'</button>
      <button type="primary" class="f-margin-bottom-0" bindtap="getProductBySelect_desc">获取一个产品不返回字段'str, array_i'</button>
    </block>
  </card>

  <card>
    <text class="card-title">compare 查询</text>
    <button type="primary" bindtap="compareQuery" data-type="=">compare 查询(int = 50)</button>
    <button type="primary" bindtap="compareQuery" data-type="!=">compare 查询(int != 50)</button>
    <button type="primary" bindtap="compareQuery" data-type=">">compare 查询(int > 50)</button>
    <button type="primary" bindtap="compareQuery" data-type=">=">compare 查询(int ≥ 50)</button>
    <button type="primary" bindtap="compareQuery" data-type="<">compare 查询(int ＜ 50)</button>
    <button type="primary" class="f-margin-bottom-0" bindtap="compareQuery" data-type="<=">compare 查询(int ≤ 50)</button>
  </card>

  <card>
    <text class="card-title">字符串查询</text>
    <button type="primary" bindtap="containsQuery">字符串 contains 'm' 查询</button>
    <button type="primary" bindtap="regxQuery" data-type="str">字符串正则查询 - 字面量</button>
    <button type="primary" class="f-margin-bottom-0" bindtap="regxQuery" data-type="func">字符串正则查询 - 构造函数</button>
  </card>

  <card>
    <text class="card-title">数组查询</text>
    <button type="primary" bindtap="inQuery">数组 in 查询</button>
    <button type="primary" bindtap="notInQuery">数组 notIn 查询</button>
    <button type="primary" bindtap="arrayContainsQuery">数组 arrayContains 查询</button>
    <button type="primary" class="f-margin-bottom-0" bindtap="compareQuery_2">数组指定值查询</button>
  </card>

  <card>
    <text class="card-title">null 查询</text>
    <button type="primary" bindtap="nullQuery">null 查询</button>
    <button type="primary" class="f-margin-bottom-0" bindtap="notNullQuery">not null 查询</button>
  </card>

  <card>
    <text class="card-title">exists 查询</text>
    <button type="primary" bindtap="existsQuery">exists 查询</button>
    <button type="primary" class="f-margin-bottom-0" bindtap="notExistsQuery">notExists 查询</button>
  </card>

  <card>
    <text class="card-title">多条件查询</text>
    <button type="primary" class="f-margin-bottom-0" bindtap="complexQueryProduct">多条件查询 and / or</button>
  </card>

  <card>
    <text class="card-title">分页与排序</text>

    <view class="query-contrl-panel">
      <view >order_by : </view>
      <view class="sort-key-item" bindtap="handleSelectSortKey" data-sort-key="num"><radio checked="{{sortKey==='num'}}" />num</view>
      <view class="sort-key-item" bindtap="handleSelectSortKey" data-sort-key="-num"><radio checked="{{sortKey==='-num'}}" />-num</view>
      <view class="sort-key-item" bindtap="handleSelectSortKey" data-sort-key="str"><radio checked="{{sortKey==='str'}}" />str</view>
      <view class="sort-key-item" bindtap="handleSelectSortKey" data-sort-key="-str"><radio checked="{{sortKey==='-str'}}" />-str</view>
    </view>

    <view class="query-contrl-panel">
      <view>limit : </view>
      <stepper bind:inputchange="handleModifyLimit" value="{{limit}}"></stepper>
    </view>

    <view class="query-contrl-panel">
      <view>offset : </view>
      <stepper bind:inputchange="handleModifyOffset" value="{{offset}}"></stepper>
    </view>

    <button type="primary" bindtap="getAllProductWithOptions">查找</button>

    <scroll-view scroll-y class="file-list">
      <view qq:for="{{records}}" qq:key="num" class="file-item">
        <view class="file-name">num: {{item.num}}, str: {{item.str}}</view>
      </view>
    </scroll-view>
  </card>

  <card>
    <text class="card-title">字段过滤与扩展</text>
    <button type="primary" bindtap="selectQuery">返回指定字段 [num]</button>
    <button type="primary" bindtap="unselectQuery">不返回指定字段 [-array_s, -str, -file]</button>
    <button type="primary" bindtap="expandCreated_by">expand created_by</button>
    <button type="primary" bindtap="getAllProductWithExpand">获取所有产品(expand pointer)</button>
    <block qq:if="{{!records.length}}">
      <button type="primary" class="f-margin-bottom-0" disabled>tableObject get expand</button>
    </block>
    <block qq:else>
      <button type="primary" class="f-margin-bottom-0" bindtap="getExpand">tableObject get expand</button>
    </block>
  </card>

  <card>
    <text class="card-title">时间类型字段查询</text>
    <button type="primary" bindtap="queryByTime1">created_at 查询</button>
    <button type="primary" class="f-margin-bottom-0" bindtap="queryByTime2">date 查询</button>
  </card>

  <card>
    <text class="card-title">hasKey 查询</text>
    <button type="primary" class="f-margin-bottom-0" bindtap="hasKey">hasKey "num" 查询 </button>
  </card>

  <card>
    <text class="card-title">count 查询</text>
    <button type="primary" class="f-margin-bottom-0" bindtap="countItem">count 查询</button>
  </card>

  <card>
    <text class="card-title">pointer 查询</text>
    <button data-action="exist" type="primary" bindtap="pointerQuery">pointer 查询 exist</button>
    <button data-action="compare" type="primary" bindtap="pointerQuery">pointer 查询 compare</button>
    <button data-action="in" type="primary" bindtap="pointerQuery">pointer 查询 in</button>
    <button data-action="notIn" type="primary" class="f-margin-bottom-0" bindtap="pointerQuery">pointer 查询 not in</button>
  </card>

</view>
