// 配置路由
import React, { Component } from "react";
// 路由依赖
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";


import Home from "../modules/home";
import Cart from "../modules/cart";
import Category from "../modules/category";
import My from "../modules/user-my";
import Login from "../modules/login";

const routerList = [
  { path: "/", exact: true, component: Home },
  { path: "/cart", exact: false, component: Cart },
  { path: "/category", exact: false, component: Category },
  { path: "/my", exact: false, component: My },
  { path: "/login", exact: false, component: Login },
];

class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {routerList.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                component={item.component}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default RouteConfig;
