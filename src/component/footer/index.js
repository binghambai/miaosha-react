import {
    Component
} from "react";
import {
    NavLink
} from "react-router-dom";

import './index.css'

export default class Footer extends Component {
    state = {
        //   底部导航栏
        footerNav: [
            { path: "/", exact: true, icon: "home.jpg", name: "首页" },
            { path: "/category", exact: false, icon: "category.jpg", name: "分类" },
            { path: "/cart", exact: false, icon: "cart.jpg", name: "购物车" },
            { path: "/my", exact: false, icon: "my.jpg", name: "我的" }
        ]
    };
    render() {
        return (
            <div className="footer">
                <div className="foot-ul">
                    {this.state.footerNav.map((item, index) => {
                        return (
                            <NavLink
                                to={item.path}
                                exact={item.exact}
                                key={item + index}
                                className="foot-item"
                            >
                                <img src={require("./img/" + item.icon).default} alt="" />
                                <span>{item.name}</span>

                            </NavLink>
                        );
                    })}
                </div>
            </div>
        );
    }
}