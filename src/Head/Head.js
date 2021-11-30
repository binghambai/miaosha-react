import React, {Component} from "react";
import "./head.css";
export default class Head extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="head">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..."/>
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Go!</button>
                      </span>
                </div>
            </div>
        )
    }
}

