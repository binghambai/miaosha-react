
import React,{Component} from "react";
import "./cart.css"
export default class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            goodsItem : {
                name:'',
                pic:'',
                price:'',
                desc: '',
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
                    <div className='container cart-item' id='cart-item-padding'>1</div>
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
            </div>
        );
    }
}

