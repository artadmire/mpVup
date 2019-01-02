<template>
  <div class="container">
    <div class="testbtn" @click="login">登录</div>
    <button class="testbtn" @click="scanCode">async await</button>
  </div>
</template>

<script>
import YearProgress from "@/components/YearProgress";
import qcloud from "wafer2-client-sdk";
import utils from "@/utils";
import { get, post } from "@/utils/request";
import config from "@/config";
// import card from '@/components/card'
export default {
  data() {
    return {
      userInfo: ""
    };
  },

  components: {},
  created() {
    this.userInfo = wx.getStorageSync("userinfo");
    // utils.showSuccess("成功");
  //  utils.showModal("失败","shibai")
  },
  methods: {
    async testAsync() {
      return "hello async";
    },
    async addBook(isbook) {
      const wip = await post("/weapp/addbook", {
        isbook,
        openId: this.userInfo.openId
      });
      
    },
    scanCode() {
      const that = this;
      wx.scanCode({
        success: function(res) {
          if (res.result) {
            console.log(res, "扫码成");
            that.addBook(res.result);
          }
        }
      });
    },
    login() {
      console.log(22);
      let user = wx.getStorageSync("userinfo");
      let self = this;
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.login({
          success: function(userinfo) {
            console.log("登录成功", userinfo);
            utils.showSuccess("登录成功");
            wx.setStorageSync("userinfo", userinfo);
            self.userInfo = userinfo;
          },
          fail: function(err) {
            console.log("登录失败", err);
          }
        });
      }
      //console.log('clickHandle:', msg, ev)
    }
  }
};
</script>

<style lang="scss" scoped>
.testbtn {
  width: 90%;
  height: 40px;
  background: red;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 5px;
  line-height: 40px;
  text-align: center;
}
</style>
