import { Component } from "react";
import { Carousel } from "bootstrap";
import axios from "axios";

import './css/menu.css'
import './css/main.css'
import "./css/body.css"

import Footer from "../../component/footer";

import {setGoodsItemList} from '../../store/action';
import { connect } from "react-redux";

const goodsReq = {
    "pageNum" : 1,
    "pageSize": 2,
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index : 0,
            goods: []
        }
    }

    addCart = (item) => {
        console.log("加入购物车");
        // console.log(item);
        alert("添加成功")
        let {setGoodsItemList} = this.props;
        // console.log(this.props);
        // console.log(this.context.store);
        // console.log(this.context);
        setGoodsItemList(item);
    }


    

    componentDidMount() {
        axios({url:"/api/goods/getAll", method: 'post', data: goodsReq}).then(resp => {
            // console.log(resp.data.context.goodsDetailVOS)
            this.setState({
                goods: resp.data.context.goodsDetailVOS
            })
            console.log('加载商品数据');
        }).catch(err =>{
            console.log(err)
        })

    }

    render() {


        let list = this.state.goods
        let htmlList = []
        for(let i =0; i< list.length; i +=2) {
            let tmp = []
            for (let j=i; j< i+2 && j<list.length; j ++) {
                tmp.push(list[j])
            }
            htmlList.push(tmp.map(item =>

                <td>
                    <div className="container goods-item">
                        <img src={item.imgUrl} className="imgSize" alt="no img" mode='center'/>
                        <p className="goods-name">{item.name} + {item.desc}</p>
                        <p  className="goods-price"><span className="glyphicon glyphicon-usd usd-color"></span>{item.price}
                        <span onClick={this.addCart.bind(this, item)} className="glyphicon glyphicon-shopping-cart cart"></span>
                        </p>

                    </div>
                </td>
            ))
        }
        let slideArr = ["../img/1.jpg", "../img/2.jpg", "../img/3.jpg", "../img/goods1.png"]
        return (
            <div className="body">
                {/* <div className="container left">
                        <Carousel className="img" autoPlay={"true"} infiniteLoop={"true"} width={"99%"}
                                  interval={"2000"} renderThumbs={(children: React.ReactChild[]) => []}>
                            <div>
                                <img className={"img-class"} src={"../img/1.jpg"}/>
                            </div>
                            <div className={"img-class"}>
                                <img className="car-img" src={"../img/2.jpg"}/>
                            </div>
                            <div className={"img-class"}>
                                <img src={"../img/3.jpg"}/>
                            </div>
                        </Carousel>
                </div> */}
                {/* <HomeSwiper slideArr={slideArr} /> */}

                <div className="container bottom">
                    <div className="row">
                        <table className="table" border="0">
                            {htmlList.map(item =>
                                <tr>
                                    {item}
                                </tr>
                            )}
                        </table>
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
      setGoodsItemList (data) {
          console.log("传递商品数据至购物车");
          dispatch(setGoodsItemList(data))
      }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)
