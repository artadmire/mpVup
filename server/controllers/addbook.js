
// "http://api.douban.com/v2/book/isbn"
// 新增图书
// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book

// https://api.douban.com/v2/book/isbn/9787536692930 接口
const https = require("https")
const { mysql } = require("../qcloud")
module.exports = async (ctx)=>{
  const {isbook, openId } = ctx.request.body;
  if(isbook && openId){
    const findRes = await mysql('books').select().where('isbn',isbook)
    if(findRes.length){
      ctx.state = {
        code:-1,
        data:{
          msg:'图书已存在'
        }
      }
      return
    }
    let url = "https://api.douban.com/v2/book/isbn/"+isbook
    let bookinfo = await getJSON(url)
    console.log(bookinfo,'bookinfo');
    const rate = bookinfo.rating.average
    const { title, image, alt, publisher, summary ,price} = bookinfo
    const tags = bookinfo.tags.map(v=>{
      return `${v.title} ${v.count}`
    }).join(',')
    const author = bookinfo.author.join(',');
    const isbn = isbook;
    try {
      await mysql('books').insert({
        isbn,openId, rate,title, image, alt, publisher, summary ,price,tags,author
      })
      ctx.state.data = {
        title,
        msg:'succ'
      }
    }catch(e) {
      ctx.state = {
        code:-1,
        data:{
          msg:'新增失败:'+e.sqlMessage
        }
      }
    }
    
  }
 
}

function getJSON(url){
  return new Promise((resolve,reject)=>{
    https.get(url,res=>{
      let urlData = ''
      res.on('data',data=>{
        urlData += data
      })
      res.on("end",data=>{
        const bookinfo = JSON.parse(urlData)
        if(bookinfo.title) {
          resolve(bookinfo)
        }else{
          reject(bookinfo)
        }
      })
    })
  })
}