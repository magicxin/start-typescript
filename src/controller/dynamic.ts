function makeData(res: any): any {
  const result: any = [];
  const total: number = res.totalPage;
  res.dataList.forEach((item: any) => {
    result.push({
      avatar: '', // 头像
      datetime: item.sendTime, // 时间
      author: '', // 发布者
      where: '', // 地点
      times: item.readNum + '次观看', // 浏览次数
      title: item.infoTitle, // 标题
      content: item.infoContent, // 内容
      images: item.pictureList.length > 0 ? [this.addPath(item.pictureList[0].filePath)] : [], // 图片
      id: item.id,
    });
  });
  return {
    result,total,
  };
}

export {
  makeData,
};
