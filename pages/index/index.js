// index.js
Page({
  data: {
    username: '',
    password: ''
  },
  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },
  login() {
    const { username, password } = this.data;
    wx.request({
      url: 'http://localhost:3000/login', // 后端接口地址
      method: 'POST',
      data: { username, password },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({ title: '登录成功' });
          // 根据需要跳转页面
        } else {
          wx.showToast({ title: '登录失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.showToast({ title: '请求失败', icon: 'none' });
      }
    });
  }
});