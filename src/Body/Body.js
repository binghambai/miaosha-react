import React, {Component} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./body.css"
import Img1 from '../img/1.jpg'
import Img2 from '../img/2.jpg'
import Img3 from '../img/3.jpg'
import axios from 'axios'

const goodsReq = {
    "pageNum" : 1,
    "pageSize": 2,
}
export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: []
        }
    }

    componentDidMount() {
        axios({url:"/api/goods/getAll", method: 'post', data: goodsReq}).then(resp => {
            // console.log(resp.data.context.goodsDetailVOS)
            this.setState({
                goods: resp.data.context.goodsDetailVOS
            })
        }).catch(err =>{
            console.log(err)
        })

    }

    addCart = (item, e) => {
        this.props.parent.getBodyGoods(this, item)
        alert('添加成功')
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

        return (
            <div className="body">
                <div className="container left">
                        <Carousel className="img" autoPlay={"true"} infiniteLoop={"true"} width={"99%"}
                                  interval={"2000"} renderThumbs={(children: React.ReactChild[]) => []}>
                            <div>
                                <img className={"img-class"} src={Img1}/>
                                {/*<p className="legend">Legend 2</p>*/}
                            </div>
                            <div className={"img-class"}>
                                <img className="car-img" src={Img2}/>
                                {/*<p className="legend2">Legend 2</p>*/}
                            </div>
                            <div className={"img-class"}>
                                <img src={Img3}/>
                                {/*<p className="legend2">Legend 3</p>*/}
                            </div>
                        </Carousel>
                </div>
                <div className="container bottom">
                    <div className="row">
                        <table className="table" border="0">
                            {htmlList.map(item =>
                                <tr>
                                    {item}
                                </tr>
                            )}
                            {/*<tr>*/}
                            {/*    <td>*/}
                            {/*        <div className="container goods-item">*/}
                            {/*            <img className={"goods-img"} src={require('../img/goods1.png').default} alt=""/>*/}
                            {/*            <p className="goods-name">商品1asdasda asfgdfgdfgfdegfesdfsdgsdfsdfsdfsdfsdfsdfsdfsdf dad </p>*/}
                            {/*            <p  className="goods-price">99.99<span className="glyphicon glyphicon-usd usd-color"></span></p>*/}

                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td >*/}
                            {/*        <div className="container goods-item">*/}
                            {/*            <img className={"goods-img"} src={require('../img/goods2.png').default} alt=""/>*/}
                            {/*            <p className="goods-name">商品1asdasda asfgdfgdfgfdegfesdfsdgsdfsdfsdfsdfsdfsdfsdfsdf dad </p>*/}
                            {/*            <p  className="goods-price">99.99<span className="glyphicon glyphicon-usd usd-color"></span></p>*/}

                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>*/}
                            {/*        <div className="container goods-item">*/}
                            {/*            <img className={"goods-img"} src={require('../img/goods1.png').default} alt=""/>*/}
                            {/*            <p className="goods-name">商品1asdasda asfgdfgdfgfdegfesdfsdgsdfsdfsdfsdfsdfsdfsdfsdf dad </p>*/}
                            {/*            <p  className="goods-price">99.99<span className="glyphicon glyphicon-usd usd-color"></span></p>*/}

                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td >*/}
                            {/*        <div className="container goods-item">*/}
                            {/*            <img className={"goods-img"} src={require('../img/goods2.png').default} alt=""/>*/}
                            {/*            <p className="goods-name">商品1asdasda asfgdfgdfgfdegfesdfsdgsdfsdfsdfsdfsdfsdfsdfsdf dad </p>*/}
                            {/*            <p  className="goods-price">99.99<span className="glyphicon glyphicon-usd usd-color"></span></p>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>*/}
                            {/*        <div className="container goods-item">*/}
                            {/*            <img className={"goods-img"} src={require('../img/goods1.png').default} alt=""/>*/}
                            {/*            <p className="goods-name">商品1asdasda asfgdfgdfgfdegfesdfsdgsdfsdfsdfsdfsdfsdfsdfsdf dad </p>*/}
                            {/*            <p  className="goods-price">99.99<span className="glyphicon glyphicon-usd usd-color"></span></p>*/}

                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td >*/}
                            {/*        <div className="container goods-item">*/}
                            {/*            <img className={"goods-img"} src={require('../img/goods2.png').default} alt=""/>*/}
                            {/*            <p className="goods-name">商品1asdasda asfgdfgdfgfdegfesdfsdgsdfsdfsdfsdfsdfsdfsdfsdf dad </p>*/}
                            {/*            <p  className="goods-price">99.99<span className="glyphicon glyphicon-usd usd-color"></span></p>*/}

                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                        </table>



                    </div>
                </div>
            </div>
        )
    }
}
