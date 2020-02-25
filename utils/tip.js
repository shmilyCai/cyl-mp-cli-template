/**
 * 消息提示
 */
const tip = {
  showToast: (title, { icon = "success", duration = 1500, mask = true }) => {
    if (title === "" || title === null || title.length === 0) {
      return false;
    }
    wx.showToast({
      title: title ? title : "",
      icon: icon,
      duration: duration,
      mask: mask
    });
  },
  hideToast: () => {
    wx.hideToast();
  },
  showLoading: (title, mask = true) => {
    wx.showLoading({ title: title, mask: mask });
  },
  hideLoading: () => {
    wx.hideLoading();
  },
  showModal: (
    title,
    content,
    {
      confirmFunc = () => {},
      cancelFunc = () => {},
      showCancel = true,
      cancelText = "取消",
      cancelColor = "#000000",
      confirmText = "确认",
      confirmColor = "#3cc51f"
    }
  ) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel,
      cancelText: cancelText,
      cancelColor: cancelColor,
      confirmText: confirmText,
      confirmColor: confirmColor,
      success: res => {
        if (res.confirm) {
          if (typeof confirmFunc === "function") {
            confirmFunc(res);
          }
        } else if (res.cancel) {
          if (typeof cancelFunc === "function") {
            cancelFunc(res);
          }
        }
      }
    });
  }
};

export default tip;
