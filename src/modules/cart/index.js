import { Component } from "react";
import Footer from "../../component/footer";

import "./cart.css"

import { setInfoList } from "../../store/action";
import { connect } from "react-redux";
import axios from "axios";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            goodsItem : {
                name:'华为 HUAWEI P20 + AI智慧全面屏',
                pic:'',
                price:'',
                desc: '匠心剪裁，垂感质地',
                storeName:'店铺名',
                total:1  //购买个数
            },
            sumMoney: '0.00'
        }

    }

    componentDidMount(){
        let token = localStorage.getItem('token')
        if (token ==='' || token === null) {
            this.props.history.push('/login')
        }
        axios({url:'/api/token/verify?token='+token, method:'get'}).then(resp => {
            if (resp.data.code !== 'K-000000') {
                localStorage.clear()
                alert('登录过期重新登录')
                this.props.history.push('/login')
                return
            }
            localStorage.setItem('userName',resp.data.context.userName)
            localStorage.setItem('userPhone',resp.data.context.userPhone)
            localStorage.setItem('userId',resp.data.context.userId)
            localStorage.setItem('userPic',resp.data.context.userPic)
        }).catch(e => {
            console.log(e)
        })
        let getList = {
            'userId': localStorage.getItem('userId')
        }
        axios({url:'/api/cart/getCartList', method:'post', data: getList}).then(resp => {
            if (resp.data.code !== 'K-000000') {
                this.setState({
                    sum : 0
                })
                alert(resp.data.msg)
                return
            }
            console.log(resp.data.context)
        })
    }

    manager(e) {
        // let { goodsItemList} = this.props
        // console.log(goodsItemList);
    }

    render() {
        let {goodsItemList} = this.props
        let htmlList = [];
        htmlList.push(goodsItemList.map(item => {
            return (
                <div className='container cart-item' id='cart-item-padding'>
                <div className='row store-name'>
                    <div className="col-xs-3" id='col-radio-store-name'>
                        <div className="radio" id='radio-store-name'>
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="love" />
                            </label>
                        </div>
                    </div>
                    <div className='col-xs-3 col-store-name'>
                        <p><span className='glyphicon glyphicon-gift'/>{this.state.goodsItem.storeName}</p>
                    </div>
                </div>
                <div className='row row-goods-dec'>
                    <div className='col-xs-3 goods-pic-item' id='goods-pic-width'>
                        <img className='item-img' src={item.imgUrl===''?require('./img/goods2.png').default:item.imgUrl}/>
                    </div>
                    <div className='col-xs-3 goods-dec-item' id='goods-dec-width'>
                        <p className='item-name-p'>{item.name}</p>
                        <p className='item-dec-p'>{item.desc}</p>
                        <div className='row'>
                            <div className='col-xs-2'>
                                <p className='item-price'>
                                    <span className='glyphicon glyphicon-usd money-icon'/>
                                    213.00</p>
                            </div>
                            <div className='col-xs-2 goods-sum'>
                                <p>x{this.state.goodsItem.total}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }))
        return (
            <div className="back">
                <div className='row row-name'>
                    <div className="col-xs-3 chart-name"><p className='p1'>购物车<span>({this.state.sum})</span></p></div>
                    <div className="col-xs-3 manager-name"><p onClick={event => this.manager(event)} className='p2'>管理</p></div>
                </div>
                <div className='container chart-list' id='chart-list-padding'>
                {htmlList.map(item =>
                                <tr>
                                    {item}
                                </tr>
                            )}
                </div>
                <div className='row-settle'>
                    <div className="col-xs-3 ">
                        <div className="radio select-all">
                            <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="love" />
                                <p>全选</p>
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-3 sum-money">
                        <p>合计:<span>  {this.state.sumMoney}</span>
                            <button className='settlement'>
                                结 算
                            </button>
                        </p>

                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

    const mapStateToProps = (state) => {
    return {
      goodsItemList: state.goodsItemList,
    }
  }

  // mapDispatchToProps：将dispatch映射到组件的props中
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    //   setGoodsItemList (data) {
    //       console.log("传递商品数据至购物车");
    //       dispatch(setGoodsItemList(data))
    //   }
    //   setPageTitle (data) {
    //       // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
    //       dispatch(setPageTitle(data))
    //       // 执行setPageTitle会返回一个函数
    //       // 这正是redux-thunk的所用之处:异步action
    //       // 上行代码相当于
    //       /*dispatch((dispatch, getState) => {
    //           dispatch({ type: 'SET_PAGE_TITLE', data: data })
    //       )*/
    //   },
    //   setInfoList (data) {
    //       dispatch(setInfoList(data))
    //   }

    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Cart)
