import { Component } from "react";



import Footer from "../../component/footer";
import verify from  '../../utils/tokenUtils'

import './css/login.css'
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            username:'',
            phone:'',
            alert:' ',
        }
    }

    componentDidMount() {
        let user = localStorage.getItem('user')
        if (user !== '' && user !== null) {
            this.props.history.push('/')
        }
    }

    inputPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    inputUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    inputPhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    submit(e) {
        let password = this.state.password
        if (password.length < 6) {
            this.setState({
                password:''
            })
            return
        }
        let login = {
            "userName": this.state.username,
            "password": this.state.password,
            "phone": this.state.phone
        }
        axios({url:"/api/login", method: 'post', data: login}).then(resp => {
            if (resp.data.code !== 'K-000000') {
                alert('账号或密码错误')
                this.setState({
                    username:'',
                    password:'',
                    phone:'',
                    alert: '账号或密码错误',
                })
                return
            }
            localStorage.setItem("token", resp.data.context.token)
            // localStorage.setItem('userInfo', resp.data.context)
            this.props.history.push('/my')
        }).catch(err =>{
            console.log(err)
        })
    }

    render(): React.ReactNode {
        return (
            <div>
                <div className='container container-login'>
                    <div className="input-group" id='input-username'>
                        <span className="input-group-addon" id="basic-addon1">
                            <span className='glyphicon glyphicon-user'/>
                        </span>
                        <input type="text" className="form-control" placeholder="Username"
                               aria-describedby="basic-addon1" onChange={this.inputUsername.bind(this)}/>
                    </div>
                    <label className='label-username' htmlFor="basic-url">{this.state.alert}</label>
                    <div className="input-group input-password">
                        <span className="input-group-addon" id="basic-addon1">
                            <span className='glyphicon glyphicon-lock'/>
                        </span>
                        <input type="password" className="form-control" placeholder="Password"
                               aria-describedby="basic-addon1" onChange={this.inputPassword.bind(this)}/>
                    </div>
                    <label className='label-password' htmlFor="basic-url">必须大于6位数</label>
                    <div className="input-group input-phone">
                        <span className="input-group-addon" id="basic-addon1">
                            86+
                        </span>
                        <input type="text" className="form-control" placeholder="Username"
                               aria-describedby="basic-addon1" onChange={this.inputPhone.bind(this)}/>
                    </div>

                    <button type="button" className="btn btn-default" onClick={(e)=>this.submit(this, e)}>
                        <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                    </button>

                </div>
                <Footer/>
            </div>
        )
    }

}
