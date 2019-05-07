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
  let result: any = {};
  result = {
      avatar: res.authorHeadImg, // 头像
      datetime: res.sendTime, // 时间
      author: res.author, // 发布者
      where: res.orgName, // 地点
      times: res.readNum + '次观看', // 浏览次数
      title: item.infoTitle, // 标题
      content: res.infoContent, // 内容
      images: res.pictureList.length > 0 ? [this.addPath(res.pictureList[0].filePath)] : [], // 图片
      videos: res.videoList.length > 0 ? [this.addPath(res.videoList[0].filePath)] : [], // 图片
      discussList: makeDiscuss(res),
      id: res.id,
    }
  return result;
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
