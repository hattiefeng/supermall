<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多 <i class="arrow-right"></i></div>
    </div>
    <div class="info-user" v-if="commentInfo.user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-img">
        <img :src="item" v-for="(item, index) in commentInfo.images" alt="" :key="index">
      </div>
      <div class="info-explain">{{commentInfo.explain}}</div>
    </div>
  </div>
</template>

<script>

import { formatDate } from 'common/utils.js'


export default {
  name:"DetailCommentInfo",
  props:{
    commentInfo: {
      type:Object,
      default (){
        return null
      }
    } 
  },
  filters: {
    showDate(value){
      let date = new Date(value*1000);

      return formatDate(date, 'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    font-size: 13px;
    margin-right: 10px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    top: -15px;
    font-size: 15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    line-height: 1.5;
    color: #777;
  }

  .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-img {
    margin-top: 10px;
  }

  .info-img img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }

  .info-explain {
    margin-top: 3px;
    background-color: #f2f2f2;
    font-size: 12px;
    line-height: 1.5;
  }
</style>