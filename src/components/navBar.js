import React, { Component } from 'react';

export default class navBar extends Component {
    render() {
        return (<div>
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="fa fa-search"></i></a>
                        </li>
                    </ul>

                    <a className="navbar-brand mx-auto">
                        <img src="../style/logo.png" width="50" height="50" alt="" />
                    </a>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/auth/google">התחבר <i className="fa fa-user-circle-o"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>);
    }
}