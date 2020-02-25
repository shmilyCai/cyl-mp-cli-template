import config from "../config/config";
import { redirectTo } from "../utils/route";
import { ICON_TYPE, HTTP_METHOD } from "../constants/constant";
import tip from "./tip";
import { storage, storage_key } from "./auth";

/**
 * 基础请求方法
 * @param api 接口地址，接口前不需要/
 * @param method 请求方法类型，get/post
 * @param header 请求头
 * @param params 请求参数
 * @param sucFunc 服务器有返回后的回调函数
 */
const req = (
  api,
  method,
  { params = {}, sucFunc = () => {}, failFunc = () => {} }
) => {
  tip.showLoading("加载中...");
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.base_url}${api}`,
      method: method,
      header: getHeader(method),
      data: params,
      success: res => {
        console.log(res);
        if (res["statusCode"] === 403) {
          storage.setItem(storage_key.user_key_name, "");
          storage.setItem(storage_key.token, "");
          storage.setItem(storage_key.phone_number, "");
          redirectTo({ url: "/pages/login/index" });
          return false;
        }
        tip.hideLoading();
        if (res.data.code === config.return_code.success && res.data.success) {
          if (typeof sucFunc === "function") {
            sucFunc(res.data);
          }
        } else {
          tip.showToast(res.data.msg, {
            icon: ICON_TYPE.none,
            duration: 1000
          });
          if (typeof failFunc === "function") {
            failFunc(res.data);
          }
        }

        resolve(res.data);
      },
      fail: err => {
        tip.hideLoading();
        tip.showToast("网络连接超时", {
          icon: ICON_TYPE.none,
          duration: 1000
        });
        if (typeof failFunc === "function") {
          failFunc({});
        }
        reject(err);
      },
      complete() {
        // 加载完成
        wx.hideNavigationBarLoading(); // 导航加载动画消失
      }
    });
  });
};

/**
 * 获取请求头数据
 * @param methodType 请求方法类型
 * @returns {*}
 */
const getHeader = methodType => {
  const method = methodType || HTTP_METHOD.get;
  if (method === HTTP_METHOD.get) {
    return {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      token: storage.getItem(storage_key.token),
      USER_KEY_NAME: storage.getItem(storage_key.user_key_name)
    };
  }
  return {
    "content-type": "application/json",
    token: storage.getItem(storage_key.token),
    USER_KEY_NAME: storage.getItem(storage_key.user_key_name)
  };
};

/**
 * get 请求
 * @param api
 * @param params
 * @param sucFunc
 */
const get = (api, { params = {}, sucFunc = () => {}, failFunc = () => {} }) => {
  return req(api, HTTP_METHOD.get, {
    params,
    sucFunc,
    failFunc
  });
};

/**
 * post 请求
 * @param api
 * @param params
 * @param sucFunc
 */
const post = (
  api,
  { params = {}, sucFunc = () => {}, failFunc = () => {} }
) => {
  return req(api, HTTP_METHOD.post, {
    params,
    sucFunc,
    failFunc
  });
};

const put = (api, { params = {}, sucFunc = () => {}, failFunc = () => {} }) => {
  return req(api, HTTP_METHOD.put, {
    params,
    sucFunc,
    failFunc
  });
};

const del = (api, { params = {}, sucFunc = () => {}, failFunc = () => {} }) => {
  return req(api, HTTP_METHOD.del, {
    params,
    sucFunc,
    failFunc
  });
};

export { get, post, put, del };
