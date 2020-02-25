"use strict";

class Utils {
  constructor() {}

  static share = {
    title: "分享",
    path: "/pages/index/index"
  };

  static systemInfo = wx.getSystemInfoSync();

  // 格式化时间
  static formatTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return [
      [year, month, day].map(this.formatNumber).join("-"),
      [hour, minute].map(this.formatNumber).join(":")
    ];
    return [
      [year, month, day].map(this.formatNumber).join("-"),
      [hour, minute, second].map(this.formatNumber).join(":")
    ];
  }

  // 格式化长时间
  static formatLogTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return [
      [year, month, day].map(this.formatNumber).join(""),
      [hour, minute, second].map(this.formatNumber).join("")
    ];
  }

  // 格式化数字
  static formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }

  // 获取时间搓
  static getTimestamp(stringTime) {
    let _stringTime = stringTime.replace(/\-/g, "/");
    let timestamp2 = Date.parse(new Date(_stringTime));
    timestamp2 = timestamp2 / 1000;
    return timestamp2;
  }

  // rpx转换成px
  static rpxToPx(rpx) {
    return (rpx * Utils.systemInfo.windowWidth) / 750;
  }

  //px转换成rpx
  static pxToRpx(px) {
    return px / (Utils.systemInfo.windowWidth / 750);
  }

  static imageMogr(size) {
    return `imageslim`;
    return `imageMogr2/thumbnail/${size}x${size}>/interlace/1`;
  }

  //检查电话号码的长度
  static checkPhoneNum(phone) {
    if (/^1\d{10}$/.test(phone)) {
      return true;
    } else {
      return false;
    }
  }

  // 去掉空格
  static trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  }

  static isEmpty(string) {
    if (string === null || string.length === 0) {
      return true;
    }
    return false;
  }

  // 格式化秒
  static formatSeconds(value) {
    let theTime = parseInt(value); // 秒

    let theTime1 = 0; // 分

    let theTime2 = 0; // 小时

    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);

      theTime = parseInt(theTime % 60);

      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);

        theTime1 = parseInt(theTime1 % 60);
      }
    }

    let result = "" + parseInt(theTime) + "秒";

    if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + "分" + result;
    }

    if (theTime2 > 0) {
      result = "" + parseInt(theTime2) + "小时" + result;
    }

    return result;
  }
}

// 防抖，节流函数
const throttle = (method, mustRunDelay = 300) => {
  let timer,
    args = arguments,
    start;
  return function loop() {
    let self = this;
    let now = Date.now();
    if (!start) {
      start = now;
    }
    if (timer) {
      clearTimeout(timer);
    }
    if (now - start >= mustRunDelay) {
      method.apply(self, args);
      start = now;
    } else {
      timer = setTimeout(function() {
        loop.apply(self, args);
      }, 50);
    }
  };
};

// 判断字符串是否为空
const isStrEmpty = str => {
  return str == undefined || str === null || str == "null" || str === "";
};

// 判断数组是否为空
const isArrayEmpty = str => {
  return (
    str == undefined ||
    str === null ||
    str == "null" ||
    str === "" ||
    str.length === ""
  );
};

// 格式化地址
const formatLocation = (longitude, latitude) => {
  if (typeof longitude === "string" && typeof latitude === "string") {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split("."),
    latitude: latitude.toString().split(".")
  };
};

const fromAddressGetArea = str => {
  let area = {};
  let index11 = 0;
  let index1 = str.indexOf("省");
  if (index1 == -1) {
    index11 = str.indexOf("自治区");
    if (index11 != -1) {
      area.Province = str.substring(0, index11 + 3);
    } else {
      area.Province = str.substring(0, 0);
    }
  } else {
    area.Province = str.substring(0, index1 + 1);
  }

  let index2 = str.indexOf("市");
  if (index11 == -1) {
    area.City = str.substring(index11 + 1, index2 + 1);
  } else {
    if (index11 == 0) {
      area.City = str.substring(index1 + 1, index2 + 1);
    } else {
      area.City = str.substring(index11 + 3, index2 + 1);
    }
  }

  let index3 = str.lastIndexOf("区");
  if (index3 == -1) {
    index3 = str.indexOf("县");
    area.Country = str.substring(index2 + 1, index3 + 1);
  } else {
    area.Country = str.substring(index2 + 1, index3 + 1);
  }
  return area;
};

// 判断是否是整数
const isInteger = num => {
  return !isNaN(num) && num % 1 === 0;
};

export {
  throttle,
  Utils,
  isStrEmpty,
  isInteger,
  isArrayEmpty,
  formatLocation,
  fromAddressGetArea
};
