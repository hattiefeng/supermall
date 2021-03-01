import { request } from './request.js'

export function getGoodsDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}


export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
/*
lowNowPrice: "109.00"
lowPrice: "155.72"
oldPrice: "¥155.72"
price: "¥109.00"
*/
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title; //标题
    this.lowNowPrice = itemInfo.lowNowPrice; //提交金额
    this.price = itemInfo.price; //现价 ¥
    this.realPrice = itemInfo.lowNowPrice;
    this.oldPrice = itemInfo.oldPrice; //原价 ¥

    this.desc = itemInfo.desc; //温馨提示
    this.discount = itemInfo.discountDesc; //特价描述
    this.discountBgColor = itemInfo.discountBgColor

    this.columns = columns; //销量 + 收藏
    this.services = services; //快递等服务
  }
}


export class Shop {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
    this.score = shopInfo.score;
    this.shopUrl = shopInfo.shopUrl;
    this.allGoodsUrl = shopInfo.allGoodsUrl;
  }

}

export class GoodsParam {
  constructor(info, rule) {
    // images可能没有值
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}