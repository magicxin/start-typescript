interface IComment {
  avatar?: string;
  author?: string;
  content?: string;
  isReply?: string;
  time?: string;
  replyToUserName?: string;
  id: string;
  disParentId?: number;
}

function makeData(res: any): any {
  const result: any = [];
  const total: number = res.totalPage;
  res.dataList.forEach((item: any) => {
    result.push({
      avatar: item.authorHeadImg, // 头像
      datetime: item.sendTime, // 时间
      author: item.author, // 发布者
      where: item.orgName, // 地点
      times: item.readNum + '次观看', // 浏览次数
      title: item.infoTitle, // 标题
      content: item.infoContent, // 内容
      images: item.pictureList.length > 0 ? [this.addPath(item.pictureList[0].filePath)] : [], // 图片
      videos: item.videoList.length > 0 ? [this.addPath(item.videoList[0].filePath)] : [], // 图片
      discussList: makeDiscuss(item), // 评论列表
      id: item.id,
    });
  });
  return {
    result,total,
  };
}

function makeDiscuss(obj): IComment[] {
  let arr: IComment[] = [];
  obj.discussList.forEach((item) => {
    arr.push({
      avatar: item.discussHeadImg,
      author: item.discussUserName,
      content: item.discussContent,
      isReply: item.isReply,
      time: item.discussTime,
      replyToUserName: item.replyToUserName,
      disParentId: item.id,
      id: obj.id,
    });
  });
  return arr;
}
export {
  makeData,
};
