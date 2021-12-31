// actions.js

// action也是函数
export function setPageTitle (data) {
    return (dispatch, getState) => {
      dispatch({ type: 'SET_PAGE_TITLE', data: data })
    }
  }
  
export function setInfoList (data1) {
    // return (dispatch, getState) => {
    //     // 使用fetch实现异步请求
    //     window.fetch('/api/getInfoList', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => {
    //         return res.json()
    //     }).then(data => {
    //         let { code, data } = data1
    //         if (code === 0) {
    //             dispatch({ type: 'SET_INFO_LIST', data: data })
    //         }
    //     })
    // }
}

export function setGoodsItemList (data) {
    return (dispatch, getState) => {
        console.log("cart action 被调用");
        dispatch({type: 'ADD_TO_CART', data: data});
    }
    // return {type: 'ADD_TO_CART', data: data}
}