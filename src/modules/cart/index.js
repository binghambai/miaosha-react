import { Component } from "react";
import Footer from "../../component/footer";

import "./cart.css"

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            goodsItemList: props.goodsItemList,
            goodsItem : {
                name:'华为 HUAWEI P20 + AI智慧全面屏',
                pic:'',
                price:'',
                desc: '匠心剪裁，垂感质地',
                storeName:'店铺名',
                total:1  //购买个数
            },
            sumMoney: '22.66'
        }

    }

    manager(e) {

    }

    render() {
        return (
            <div className="back">
                <div className='row row-name'>
                    <div className="col-xs-3 chart-name"><p className='p1'>购物车<span>({this.state.sum})</span></p></div>
                    <div className="col-xs-3 manager-name"><p onClick={event => this.manager(event)} className='p2'>管理</p></div>
                </div>
                <div className='container chart-list' id='chart-list-padding'>
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
                                <img className='item-img' src={this.state.goodsItem.pic===''?require('./img/goods2.png').default:this.state.goodsItem.pic}/>
                            </div>
                            <div className='col-xs-3 goods-dec-item' id='goods-dec-width'>
                                <p className='item-name-p'>{this.state.goodsItem.name}</p>
                                <p className='item-dec-p'>{this.state.goodsItem.desc}</p>
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