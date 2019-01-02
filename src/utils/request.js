import config from "@/config"
import utils from "./index"
//import { config } from 'core/config';
export function get(url,data){
   return request(url,data,"GET")
}
export function post(url,data){
  return  request(url,data,"POST")
}

function request(url,data,method){
    return new Promise((resolve,reject)=>{
        wx.request({
            data,
            method,
            url:config.host+url,
            success:function(res){
                console.log(res);
                if(res.data.code == 0){
                    resolve(res.data)
                }else {
                    // utils.showModal("添加失败",res.data.data.msg)
                    reject(res.data)
                }
                
            }
        })
    })
}

 
  