import { get } from "../utils/http";

const basePage = function(option) {
  let baseOption = {
    data: {
      hasMore: true,
      total: 0,
      pageSize: 10, // 每页显示条数
      pageIndex: 1, // 当前页
      pages: 0,
      list: [],
      loading: false
    },
    loadMore: function(
      uri,
      {
        newParam = {},
        extraSucFunc = () => {},
        extraFailFunc = () => {},
        refresh = false,
        handleDataFunc = () => {}
      }
    ) {
      if (this.canLoading()) {
        const { pageIndex, pageSize } = this.data;

        const sucFunc = res => {
          console.log(res);
          this.endLoading();
          this.assembleData(res, { refresh, handleDataFunc });
          if (typeof extraSucFunc === "function") {
            extraSucFunc(res);
          }
        };

        const failFunc = res => {
          console.log(res);
          this.endLoading();
          if (typeof extraFailFunc === "function") {
            extraFailFunc(res);
          }
        };
        let params = Object.assign({ pageIndex, pageSize }, newParam);
        get(uri, { params, sucFunc, failFunc });
      }
    },
    refresh: function(
      uri,
      { newParam = {}, extraSucFunc = () => {}, extraFailFunc = () => {} }
    ) {
      this.setData({
        pageIndex: 1
      });
      this.setData(
        {
          hasMore: true,
          pageIndex: 1
        },
        () => {
          this.loadMore(uri, {
            newParam,
            extraSucFunc,
            extraFailFunc,
            refresh: true
          });
        }
      );
    },
    endLoading: function() {
      wx.stopPullDownRefresh();
      this.setData({
        loading: false
      });
    },
    canLoading: function() {
      const disable = this.data.hasMore === false || this.data.loading === true;
      if (!disable) {
        this.setData({
          loading: true
        });
        return true;
      }
      return false;
    },
    assembleData: function(
      res,
      { refresh = false, handleDataFunc = () => {} }
    ) {
      let newList = [];
      if (typeof handleDataFunc === "function") {
        handleDataFunc(res);
      }
      if (refresh) {
        newList = res.data.list;
      } else {
        newList = this.data.list.concat(res.data.list);
      }
      if (newList.length >= res.data.total) {
        this.setData({
          total: Number(res.data.total),
          list: newList,
          hasMore: false,
          pageIndex: Number(res.data.pageNum) + 1
        });
      } else {
        this.setData({
          total: Number(res.data.total),
          list: newList,
          pageIndex: Number(res.data.pageNum) + 1
        });
      }
    }
  };

  let newData = Object.assign(baseOption.data, option.data);
  baseOption.data = newData;
  for (let key in option) {
    if (key != "data") {
      baseOption[key] = option[key];
    }
  }

  return Page(baseOption);
};

module.exports = {
  basePage: basePage
};
