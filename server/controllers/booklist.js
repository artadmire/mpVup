
const { mysql } = require('../qcloud')

module.exports = async (ctx)=>{
  const { page } = ctx.request.query
  const size = 7
  const books = await mysql('books')
                  .select("books.*")//链接cSessionInfo 表，取出后面两个值相等的 //   .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                  .limit(size)
                  .offset(Number(page) * size)
                  .orderBy('books.id',"desc") //排序
  ctx.state.data = {
    list:books
    // .map(v=>{
    //   const info = JSON.parse(v.user_info)
    //   return Object.assign({},v,{
    //     user_info:{
    //       nickName:info.nickName
    //     }
    //   })
    // })
  }
}