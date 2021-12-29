import { Component } from "react";
import axios from "axios";

import './css/menu.css'
import './css/main.css'
import "./css/body.css"

import Footer from "../../component/footer";

const goodsReq = {
    "pageNum" : 1,
    "pageSize": 2,
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index : 0,
            goods: []
        }
    }

    addCart = (item) => {

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
                                <img className={"img-class"} src={Img1}/>
                            </div>
                            <div className={"img-class"}>
                                <img className="car-img" src={Img2}/>
                            </div>
                            <div className={"img-class"}>
                                <img src={Img3}/>
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