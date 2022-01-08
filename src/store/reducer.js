// reducers.js

// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from 'redux'
// 默认值
import defaultState from './state.js'
import axios from "axios";

// 一个reducer就是一个函数
function pageTitle (state = defaultState.pageTitle, action) {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      return action.data
    default:
      return state
  }
}

function infoList (state = defaultState.infoList, action) {
  switch (action.type) {
    case 'SET_INFO_LIST':
      return action.data
    default:
      return state
  }
}

function goodsItemList (state = defaultState.goodsItemList, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            state.push(action.data);
            // console.log("state.data is ")
            // console.log(action.data)
            // let goodsReq = {
            //     "goodsId":action.data.goodsId,
            //     "goodsName": action.data.name,
            //     "goodsDesc": action.data.desc,
            //     "goodsPrice": action.data.price,
            //     "goodsPic": action.data.imgUrl,
            //     "userId":
            //
            // }
            // axios({url:"/api/cart/add", method: 'post', data: goodsReq}).then(resp => {
            //     // console.log(resp.data.context.goodsDetailVOS)
            //     this.setState({
            //         goods: resp.data.context.goodsDetailVOS
            //     })
            //     console.log('加载商品数据');
            // }).catch(err =>{
            //     console.log(err)
            // })
            return state
        default:
            return state
    }
}

// 导出所有reducer
export default combineReducers({
    pageTitle,
    infoList,
    goodsItemList
})

