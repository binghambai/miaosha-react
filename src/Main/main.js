import React, {Component} from 'react'

import './menu.css'
import './main.css'

import Head from "../Head/Head";
import Body from "../Body/Body";
import Foot from "../Foot/Foot";
import User from "../User/user";
import localStorage from 'localStorage'
import Cart from "../Cart/cart";
import axios from 'axios'


export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page : "index",
            img:[{"url":"../img/1.jpg"}],
            isLogin: false,
            currentUserInfo: {
                'username':'',
                'phone':'',
                "pic":''
            }
        }
    }

    componentWillMount(): void {
        if (localStorage.getItem('token')!=='' && localStorage.getItem('token')!==null) {
            console.log('token,', localStorage.getItem('token'))
            axios.get('/api/token/verify?token=' + localStorage.getItem('token'))
                .then((resp) => {
                    if(resp.data === null) {
                        console.log('token验证未通过')
                        return
                    }
                    if (resp.data.code !== 'K-000000') {
                        console.log('token验证未通过')
                        return
                    }
                    this.setState({
                        currentUserInfo: {
                            'username':resp.data.context.userName,
                            'phone':resp.data.context.userPhone,
                            "pic":resp.data.context.userPic
                        },
                        isLogin: true,
                    })
                }).catch(err => {
                    console.log(err)
            })
        }
    }

    getChild = (r, msg) => {
        this.setState({
            page: msg
        })
    }

    getLoginStatus = (r, isLogin) => {
        this.setState({
            isLogin: isLogin
        })
    }

    getUserInfo = (r, userInfo) => {
        this.setState({
            currentUserInfo: userInfo
        })
    }

    render() {
        const CommonHead = ()=> {
            return (<div className="container context">
                        <div className={"row"}>
                            <div className="col-md-6 col-md-offset-3" >
                                <Head/>
                            </div>
                        </div>
                    </div>)
        }
        const CommonFoot = () => {
            return (
                <div className="container">
                    <div className={"row"}>
                        <Foot parent={this} page={this.state.page}/>
                    </div>
                </div>
            )
        }
            switch (this.state.page) {
                case "index":
                    return (
                        <div>
                            <CommonHead/>
                            <div className="container over">
                                <div className="container list">
                                    <div className="row">
                                        <Body/>
                                    </div>
                                </div>
                            </div>
                            <CommonFoot/>
                        </div>
                    )
                case "user":
                    return (
                        <div className="user-back">
                            <div className="container" id="main-user">
                                <div className="container main-list">
                                    <div className="row">
                                        <User parent={this} isLogin={this.state.isLogin} userInfo={this.state.currentUserInfo}/>
                                    </div>
                                </div>
                            </div>
                            <CommonFoot/>
                        </div>
                    )
                case "cart":
                    if (this.state.isLogin) {
                        return (
                            <div>
                                <div className="container main-cart">
                                    <div className="list">
                                        <div className="row">
                                            <Cart/>
                                        </div>
                                    </div>
                                </div>
                                <CommonFoot/>
                            </div>
                        )
                    } else {
                        this.setState({
                            page: 'user'
                        })
                        return (
                            <div className="user-back">
                                <div className="container" id="main-user">
                                    <div className="container main-list">
                                        <div className="row">
                                            <User parent={this} isLogin={this.state.isLogin}/>
                                        </div>
                                    </div>
                                </div>
                                <CommonFoot/>
                            </div>
                        )
                    }
            }
        }

}
