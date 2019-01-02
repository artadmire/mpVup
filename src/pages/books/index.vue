<template>
  <div class="counter-warp">
    <Card v-for="(item,index) in booklist" :key="index" :book="item"></Card>
  </div>
</template>

<script>
// Use Vuex
import store from "./store";
import { get } from "@/utils/request";
import Card from "@/components/card"
export default {
  data(){
    return {
      booklist:[]
    }
  },
  components:{
    Card
  },
  created() {
  },
  mounted (){
    this.getList();
  },
  computed: {
    // count () {
    //   return store.state.count
    // }
  },
  methods: {
    async getList(){
      const wip = await get("/weapp/booklist");
      console.log(wip,"wip");
      this.booklist = wip.data.list;
    }
    // increment () {
    //   store.commit('increment')
    // },
    // decrement () {
    //   store.commit('decrement')
    // }
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
