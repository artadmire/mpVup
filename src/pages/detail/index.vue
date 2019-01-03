<template>
  <div class="detail">
    详情页{{bookid}}
  </div>
</template>

<script>
import qcloud from "wafer2-client-sdk";
import utils from "@/utils";
import { get, post } from "@/utils/request";
import config from "@/config";
// import card from '@/components/card'
export default {
  data() {
    return {
      bookid: ''
    };
  },

  components: {
    
  },
  created() {

  },
  mounted(){
    this.bookid = this.$root.$mp.query.id
    this.getDetail();
  },
  methods: {
    async getDetail(){
      let info = await get("/weapp/bookdetail",{id:this.bookid})
    }
  },

  login() {}
};
</script>

<style lang="scss" scoped>

 
</style>
