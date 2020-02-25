import { isStrEmpty } from "./util";

// 判断对象是否为空
export const isObjEmpty = (obj, extraKeys = []) => {
  const empty = obj === null || obj === undefined || isStrEmpty(obj);
  if (empty) {
    return empty;
  }
  return Object.keys(obj).some(key => {
    let val = obj[key];
    if (!extraKeys.includes(key)) {
      return isStrEmpty(val);
    }
    return false;
  });
};

// 判断电话号码
export const isMobile = mobile => {
  if (isStrEmpty(mobile)) {
    return false;
  }
  const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
  return reg.test(mobile);
};

// 校验数字
export const isNum = num => {
  if (isStrEmpty(num)) {
    return false;
  }
  const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
  return reg.test(num);
};

// 校验邮箱
export const isEmail = email => {
  if (isStrEmpty(email)) {
    return false;
  }
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return reg.test(email);
};
