<template>
  <div class="counter-warp">
    <Card v-for="(item,index) in booklist" :key="index" :book="item"></Card>
    <p v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
// Use Vuex
import store from "./store";
import { get } from "@/utils/request";
import Card from "@/components/card";
export default {
  data() {
    return {
      booklist: [],
      init: true,
      currentPage: 1,
      more: true,
      pageSize: 0
    };
  },
  components: {
    Card
  },
  created() {},
  mounted() {
    this.getList(this.init);
  },
  computed: {
    // count () {
    //   return store.state.count
    // }
  },
  onPullDownRefresh() {
    console.log("下拉");
    this.getList(this.init);
    // wx.startPullDownRefresh({
    //   success:function(){
    //     consolel.og(2);
    //   }
    // });
  },
  onShow() {
    console.log("onshow");
  },
  onReachBottom() {
    console.log("到底了");
    if(!this.more) {
      return
    }else {
      this.currentPage +=1
      this.getList(false)
    }
  },
  methods: {
    async getList(init) {
      if (init) {
        this.currentPage = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const wip = await get("/weapp/booklist?", { page: this.currentPage });
      console.log(wip, "wip");
      if (wip.data.list.length < 7) {
        this.more = false;
      }
      if (init) {
        this.booklist = wip.data.list;
      } else {
        this.booklist = this.booklist.concat(wip.data.list);
      }
      wx.hideNavigationBarLoading();
    }
  }
};
</script>

<style>
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
