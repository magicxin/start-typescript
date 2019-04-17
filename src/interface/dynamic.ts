export default interface Dynamic {
  avatar: string; // 头像
  datetime: string; // 时间
  author: string; // 发布者
  where?: string; // 地点
  times: number; // 浏览次数
  content?: string; // 内容
  images?: string[]; // 图片
}
