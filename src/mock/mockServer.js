/* 
利用mockjs提供mock接口
生成随机数据,拦截ajax请求
不需要向外暴露,只需要外部关联(在main中引入该文件)即可
*/
import Mock from 'mockjs'
import floors from './floors.json'
import recommends from './recommends.json'
import banners from './banners.json'

//提供今日推荐接口
Mock.mock('/mock/recommends',{code:200,data:recommends})
//提供楼层接口
Mock.mock('/mock/floors', { code: 200, data: floors })
//提供广告轮播接口
Mock.mock('/mock/banners', { code: 200, data: banners })

console.log('MockServer')

