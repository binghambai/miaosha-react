import { Component } from "react";
import Footer from "../../component/footer";
import "./user.css"
import axios from "axios";

export default class My extends Component {

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
            r_needInput:'',


        }
    }

    componentDidMount() {
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
    }

    logout = (event) => {
        localStorage.clear()
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="container back">
                <div className= "under-back">
                    <div className="container userinfo">
                        <div className="row row-css">
                            <div className="col-md-2 col-xs-5">
                                <img className="userImg" alt="no"  src={require('./img/no-user.png').default}/>
                            </div>
                            <div className="col-md-3 col-xs-4 user-name">
                                <h4 className="str-name">{localStorage.getItem('userName')}</h4>
                                <h5 className="str-phone">{localStorage.getItem('userPhone')}</h5>
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

                <Footer />
            </div>
        );
    }
}
