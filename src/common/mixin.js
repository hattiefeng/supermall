import { debounce } from './utils'
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //图片加载完成后刷新scroll
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener);
    // console.log("我是混入的内容");
  }
}


export const backUpMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showBack: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}