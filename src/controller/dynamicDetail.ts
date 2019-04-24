function makeData(res: any): any {
  let result: any = {};
  result = {
      avatar: '', // 头像
      datetime: res.sendTime, // 时间
      author: '', // 发布者
      where: '', // 地点
      times: res.readNum + '次观看', // 浏览次数
      content: res.infoContent, // 内容
      images: res.pictureList.length > 0 ? [this.addPath(res.pictureList[0].filePath)] : [], // 图片
      id: res.id,
    }
  return result;
}

export {
  makeData,
};
