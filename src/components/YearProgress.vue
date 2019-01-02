<template>
  <div class="progressbar">
    <progress :percent="percent"  activeColor="red" stroke-width="20"/>
    <p>{{year}}年已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  computed:{
//今年是那一年
    year(){
      return new Date().getFullYear()
    },
  //今天过去了多少天
    days(){
      let start = new Date()
      start.setMonth(0)
      console.log(start)
      start.setDate(1)
      console.log(start)
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset/1000/60/60/24)+1
    },
    percent(){
      return (this.days*100/this.getDayOfYear()).toFixed(1)
    }
  },
  methods:{
    //是否是闰年
    isleapYear(){
      if(year%4==0 &&year%100!=0 || year%400==0){
        return true;
      }else{
        return false;
      }
    },
    //今年有多少天
    getDayOfYear(){
      return this.isleapYear ? 366 : 365
    }
  }

}
</script>

<style lang="scss" scoped>
.progressbar {
  padding: 10px;
  box-sizing: border-box;
  width:100%;
  p {
    text-align: center;
    margin-top:20px;
  }
}
</style>
