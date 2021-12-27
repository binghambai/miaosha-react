
import React,{Component} from "react";
import localStorage from 'localStorage'
import "./user.css"
import axios from "axios";

export default class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
            onClickRegister: false,
            currentUserInfo: {
                'username':'',
                'phone':'',
                "pic":''
            },
            needInput: '',

            inputUsername:'',
            inputPassword:'',

            r_username: '',
            r_password: '',
            r_phone:'',
            r_needInput:''

        }
    }

    login(e) {
        let username = this.state.inputUsername
        let password = this.state.inputPassword
        if (username===''|| password ===''){
            this.setState({
                needInput : '用户名或密码不能为空'
            })
            return
        }
        if (password.length < 6) {
            this.setState({
                needInput: '密码格式错误',
                inputPassword: '',
            })
            return;
        }
        this.setState({
            needInput:''
        })
        let loginReq = {
            'userName': username,
            'password': password
        }
        axios({url:"/api/login", method: 'post', data: loginReq}).then(resp => {
            if (resp.data.code !== 'K-000000') {
                this.setState({
                    inputPassword: '',
                })
                alert(resp.data.msg)
                return
            }
            let user = resp.data.context
            this.setState({
                isLogin: true,
                userName: user.userName,
                userPhone: user.userPhone,
                userPic: user.userPic
            })
            let userInfo = {
                'username':user.userName,
                'phone':user.userPhone,
                "pic":user.userPic===null?'':user.userPic
            }
            this.props.parent.getUserInfo(this, userInfo)
            localStorage.setItem('token', user.token)
            this.props.parent.getLoginStatus(this, true)

        }).catch(err =>{
            console.log(err)
        })
    }

    logout(e) {
        localStorage.clear()
        this.props.parent.getLoginStatus(this, false)
        let userLogout = {
            'username':'',
            'phone':'',
            "pic":''
        }
        this.props.parent.getUserInfo(this, userLogout)
        this.setState({
            isLogin: false
        })
    }

    registerUser(e) {
        this.setState({
            onClickRegister: true
        })
    }

    inputPwdChange(e) {
        this.setState({
            inputPassword: e.target.value
        })
    }

    inputUsrChange(e) {
        this.setState({
            inputUsername: e.target.value
        })
    }

    getRusername(e) {
        this.setState({
            r_username:e.target.value
        })
    }

    getRpassword(e) {
        this.setState({
            r_password:e.target.value
        })
    }
    getRphone(e) {
        this.setState({
            r_phone:e.target.value
        })
    }

    submitInfo(e) {
        let username = this.state.r_username
        let password = this.state.r_password
        let phone = this.state.r_phone
        if (username ==='' ||password ==='' || phone==='') {
            this.setState({
                r_needInput: '缺少要填的值'
            })
            return
        }
        if (password.length < 6) {
            this.setState({
                r_needInput:'密码长度不够',
                r_password:''
            })
            return
        }
        this.setState({
            r_needInput:''
        })
        let postBody = {
            "customerName": username,
            "customerPhone": phone,
            "customerPassword": password
        }
        axios({url:"/api/customer/create", method: 'post', data: postBody}).then(resp => {
            if (resp.data.code !== 'K-000000') {
                this.setState({
                    r_password:'',
                })
                alert(resp.data.msg)
                return
            }
            this.setState({
                onClickRegister: false
            })
            alert("注册成功")

        }).catch(err =>{
            console.log(err)
        })
    }

    render() {
        if (this.state.onClickRegister){
            return (
                <div className="container back">
                    <div className="container login-register">
                        <form role="form">
                            <div className="input-group login-input">
                                <span className="input-group-addon" id="sizing-addon2"><span className='glyphicon glyphicon-user'/></span>
                                <input value={this.state.r_username} onChange={(e) => this.getRusername(e)} type="text" className="form-control" placeholder="Username"
                                       aria-describedby="sizing-addon2"/>
                            </div>
                            <div className="input-group login-input">
                                <span className="input-group-addon" id="sizing-addon2"><span className='glyphicon glyphicon-user'/></span>
                                <input value={this.state.r_phone} onChange={(e) => this.getRphone(e)} type="number" className="form-control" placeholder="phone"
                                       aria-describedby="sizing-addon2"/>
                            </div>
                            <div className="input-group login-input">
                                <span className="input-group-addon" id="sizing-addon2"><span className='glyphicon glyphicon-lock'/></span>
                                <input value={this.state.r_password} onChange={(e) => this.getRpassword(e)} type="password" className="form-control" placeholder="Password"
                                       aria-describedby="sizing-addon2"/>
                            </div>
                            <p className='r_errInfo'>{this.state.r_needInput}</p>
                            <div className='r_login-btn'>
                                <span onClick={(e) =>this.submitInfo(e)} className='glyphicon glyphicon-log-in'/>
                                <span className='register-btn-txt'>注册</span>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        let loginInfo
        if (this.state.isLogin) {
            loginInfo = (
                <div className="container back">
                    <div className= "under-back">
                        <div className="container userinfo">
                            <div className="row row-css">
                                <div className="col-md-2 col-xs-5">
                                    <img className="userImg" alt="no"  src={this.props.userInfo.pic===''?require('../img/no-user.png').default:this.props.userInfo.userPic}/>
                                </div>
                                <div className="col-md-3 col-xs-4 user-name">
                                    <h4 className="str-name">{this.props.userInfo.username}</h4>
                                    <h5 className="str-phone">{this.props.userInfo.phone}</h5>
                                </div>
                                <div className="col-md-2 col-xs-2 " id='setting'>
                                    <div className="dropdown">
                                        <span className='glyphicon glyphicon-cog icon-setting
                                        ' data-toggle='dropdown'/>
                                        <span className="caret"></span>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">设置</a></li>
                                            <li role="separator" className="divider"></li>
                                            <li><a onClick={(e) =>this.logout(e)}>登出</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="other">
                                <div className="row dianpu">
                                    <div className="col-md-4 col-xs-4">
                                        <button>
                                            <span className="glyphicon glyphicon-heart-empty"></span>
                                            <p>收藏</p>
                                        </button>
                                    </div>
                                    <div className="col-md-3 col-xs-4">
                                        <button>
                                            <span className="glyphicon glyphicon-paperclip"></span>
                                            <p>关注店铺</p>
                                        </button>
                                    </div>
                                    <div className="col-md-3 col-xs-3">
                                        <button>
                                            <span className="glyphicon glyphicon-time"></span>
                                            <p>足迹</p>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="container userList">
                            <ul className="list-group m-list" >
                                <li className="list-group-item">我的收获地址</li>
                                <li className="list-group-item">常用联系人</li>
                                <li className="list-group-item">我的钱包</li>
                                <li className="list-group-item">联系客服</li>
                                <li className="list-group-item">关于</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            loginInfo = (
                <div className="container back">
                    <div className="container login-card">
                        <div className='logo-div'>
                            <img className='logo' src={require("../img/no-user.png").default}/>
                        </div>
                        <div className="input-group login-input">
                            <span className="input-group-addon" id="sizing-addon2"><span className='glyphicon glyphicon-user'/></span>
                            <input value={this.state.inputUsername} onChange={(e) => this.inputUsrChange(e)} type="text" className="form-control" placeholder="Username"
                                   aria-describedby="sizing-addon2"/>
                        </div>
                        <div className="input-group login-input">
                            <span className="input-group-addon" id="sizing-addon2"><span className='glyphicon glyphicon-lock'/></span>
                            <input value={this.state.inputPassword} onChange={(e) => this.inputPwdChange(e)} type="password" className="form-control" placeholder="Password"
                                   aria-describedby="sizing-addon2"/>
                        </div>
                        <p>{this.state.needInput}</p>
                        <div className='login-btn'>
                            <span onClick={(e) =>this.login(e)} className='glyphicon glyphicon-log-in'/>
                            <span><a onClick={(e) => this.registerUser(e)} className='register'>注册</a></span>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            loginInfo
        );
    }
}
