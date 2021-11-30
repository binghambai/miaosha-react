import React, {Component} from 'react'

import './menu.css'
import './main.css'

import Head from "../Head/Head";
import Body from "../Body/Body";
import Foot from "../Foot/Foot";

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page : "index",
            img:[{"url":"1"}]
        }
    }

    getChild = (r, msg) => {
        this.setState({
            page: msg
        })
    }



    render() {
        if (this.state.page === "index") {
            return (
                <div>
                    <div className="container context">
                        <div className={"row"}>
                            <div className="col-md-6 col-md-offset-3" >
                                <Head/>
                            </div>
                        </div>
                    </div>
                    <div className="container over">
                        <div className="container list">

                            <div className="row">
                                <Body/>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className={"row"}>
                            <Foot parent={this} page={this.state.page}/>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page ==="user") {
            // let t =

            return (
                <div>
                    {this.state.img.map(item => <img src={require("../img/" + this.state.img + ".jpg").default}/>)}
                    {/*<img src={require().default}/>*/}
                </div>
            )
        }
    }
}
