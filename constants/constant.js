const ICON_TYPE = {
  success: "success",
  loading: "loading",
  none: "none"
};

const HTTP_METHOD = {
  get: "GET",
  post: "POST",
  put: "PUT",
  del: "DELETE"
};

// 订单状态
const ORDER_STATUS_TEXT = {
  0: "未支付",
  1: "已支付",
  2: "办理中",
  3: "用户取消",
  4: "办理失败",
  5: "运营端取消",
  6: "办理成功",
  7: "已完成"
};

// 路由状态
const ROUTE_STATUS_TEXT = {
  "0": "已下单",
  "1": "待揽件",
  "2": "已揽件",
  "3": "运输在途",
  "4": "已签收",
  "5": "异常签收",
  "6": "部分签收",
  "7": "派送中"
};

// 退款状态
const REFUND_STATUS_TEXT = {
  "0": "待审核",
  "1": "已通过",
  "2": "已到账",
  "3": "已取消",
  "4": "被驳回",
  "5": "已撤回"
};

// 退款类型
const REFUND_TYPE_TEXT = {
  "1": "用户主动申请退款",
  "2": "撤销订单"
};

// 身份类型
const PEOPLE_TYPE = {
  在职人员: "企业，事业单位员工",
  自由职业者: "自由职业，个体经营者",
  退休人员: "退休，离休人员",
  在校学生: "在校学生",
  学龄前儿童: "学龄前儿童"
};

export {
  ICON_TYPE,
  HTTP_METHOD,
  ORDER_STATUS_TEXT,
  ROUTE_STATUS_TEXT,
  REFUND_STATUS_TEXT,
  REFUND_TYPE_TEXT,
  PEOPLE_TYPE
};
