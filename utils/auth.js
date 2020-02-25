import { API } from "../api/api";
import { post } from "./http";
import { isStrEmpty, throttle } from "./util";
import { navigateTo } from "./route";

const storage_key = {
  history_keywords: "hk",
  token: "token",
  cart: "cart_",
  user_key_name: "USER_KEY_NAME",
  open_id: "openId",
  phone_number: "phoneNumber"
};

const storage = {
  getItem: key => wx.getStorageSync(key),
  setItem: (key, value) => wx.setStorageSync(key, value),
  remoteItem: key => wx.removeStorageSync(key)
};

/**
 * 如果用户没有登陆，则统一进行登陆
 * @param success
 * @param params
 */
const unLogin = (
  encryptedData,
  iv,
  { fromMineCode = "", successFun = () => {} }
) => {
  if (isStrEmpty(iv) || isStrEmpty(encryptedData)) {
    wx.showToast({
      title: "授权失败,请重新授权！",
      icon: "none"
    });
    return false;
  }

  const _sucFunc = () => {
    let res = {};
    return res => {
      console.log(res);
      storage.setItem(storage_key.token, res.data.token);
      storage.setItem(storage_key.user_key_name, res.data.USER_KEY_NAME);
      storage.setItem(storage_key.open_id, res.data.openId);
      storage.setItem(storage_key.phone_number, res.data.tel);
      wx.navigateBack({
        delta: 1
      });
      if (typeof successFun === "function") {
        successFun();
      }
    };
  };

  const _loginCode = code => {
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    const params = {
      code: code,
      encryptedData: encryptedData,
      iv: iv
    };
    const sucFunc = _sucFunc();
    post(API.LOGIN, {
      params,
      sucFunc
    });
  };

  //判断登录状态
  wx.checkSession({
    //session_key 未过期，并且在本生命周期一直有效
    success: function() {
      const params = {
        openId: storage.getItem(storage_key.open_id),
        encryptedData: encryptedData,
        iv: iv
      };
      if (params.openId) {
        const sucFunc = _sucFunc();
        post(API.LOGIN, {
          params,
          sucFunc
        });
      } else {
        _loginCode(fromMineCode);
      }
    },
    fail: function() {
      // session_key 已经失效，需要重新执行登录流程
      wx.login({
        success: res => {
          _loginCode(res.code);
        }
      });
    }
  });
};

const loginCheck = {
  interceptor: (func, params, { needLogin = false, app = {} }) => {
    if (!needLogin) {
      throttle(func.call(this, params));
    } else {
      const token = storage.getItem(storage_key.token);
      const phone_number = storage.getItem(storage_key.phone_number);

      if (isStrEmpty(phone_number) || isStrEmpty(token)) {
        navigateTo({
          url: "/pages/login/index"
        });
      } else {
        throttle(func.call(this, params));
      }
    }
  }
};

export { storage_key, storage, unLogin, loginCheck };
