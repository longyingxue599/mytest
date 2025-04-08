Page({
  data: {
    hotelName: '',
    location: '',
    description: ''
  },
  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },
  addHotel() {
    const { hotelName, location, description } = this.data;
    wx.request({
      url: 'http://localhost:3000/addHotel', // 后端添加酒店接口
      method: 'POST',
      data: { hotelName, location, description },
      success: (res) => {
        if (res.statusCode === 201) {
          wx.showToast({ title: '酒店添加成功' });
          // 根据需要跳转页面
        } else {
          wx.showToast({ title: '添加失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.showToast({ title: '请求失败', icon: 'none' });
      }
    });
  }
});