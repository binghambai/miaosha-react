const initialState = { 
    count: 0,
    goodsItemList : [],
}
const appReducer = (state = initialState, action) => {
 switch (action.type) { 
   case 'ADD_CART': 
        goodsItemList
    default:            
        return state;    
    }
 }
export default appReducer;