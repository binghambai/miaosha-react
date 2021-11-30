import React, {Component} from "react";
import "./foot.css"
export default class Foot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "index"
        }
    }
    On1 = () => {
        this.props.parent.getChild(this, "index")

    }

    On2 = () => {
        this.props.parent.getChild(this, "user")
    }

    render() {
        return (
            <div className="foot">
                <ul className="foot-ur">
                    <button onClick={this.On1}> <span  className={this.props.page==="index"?"glyphicon glyphicon-home icon-green":"glyphicon glyphicon-home"} aria-hidden="true"><li>首页</li></span></button>
                    <button onClick={this.On2}> <span className={this.props.page==="user"?"glyphicon glyphicon-user icon-green":"glyphicon glyphicon-user"} aria-hidden="true"><li>我的</li></span></button>
                </ul>
            </div>
        )
    }
}
