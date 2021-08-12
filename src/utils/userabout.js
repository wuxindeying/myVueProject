
//这个函数时让用户获取到唯一标识
//第一步:先从localStorage中获取,如果没有
//第二步:在调用uuid创建心的,并且还要存储到localStoragage
import {v4 as uuidv4} from 'uuid'
function getUserTempId() {
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  if (!userTempId) {
    userTempId = uuidv4();   //自动创建一个id字符串
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  return userTempId
}

let TOKEN_KEY = 'TOKEN_KEY'
function setToken(token){
  localStorage.setItem(TOKEN_KEY,token)
}

function getToken(){
  return localStorage.getItem(TOKEN_KEY)
}

function removeToken(){
  localStorage.removeItem(TOKEN_KEY)
}


export {
  getUserTempId,
  setToken,
  getToken,
  removeToken,
}