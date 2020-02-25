const navigateTo = params => {
  wx.navigateTo(params);
};

const redirectTo = params => {
  wx.redirectTo(params);
};

export { navigateTo, redirectTo };
