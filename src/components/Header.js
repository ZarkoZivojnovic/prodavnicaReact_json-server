import React from "react";
import logo from "../graph/logo.png";
import shoppingCart from "../graph/shopping.png";

const isUserLogged = (props) => {
    if (props.loggedUser !== "") {
        return (
            <nav>
                <h4>Logged user: {props.loggedUser}</h4>
                <button className="btn" onClick={props.signOut}>Sign Out</button>
            </nav>
        )
    }
    return (
        <nav>
            <a href="/" onClick={event => {event.preventDefault(); props.showModal("loginModal")}}>Login</a>
            <a href="/" onClick={event => {event.preventDefault(); props.showModal("signInModal")}}>Sign up</a>
        </nav>
    )
};

const header = (props) => {
    return (
        <header>
            <div className="header_top">
                <div className="logo"><img src={logo} alt="logo"/></div>
                <nav>
                    <a href="/">Home</a>
                    <a href="/">Categories</a>
                </nav>
                {isUserLogged(props)}
                <div className="basketBtn"  onClick={event => {props.showModal("modal")}}>
                    <img src={shoppingCart} alt="shoppingCart" style={{width:"60px", height:"auto"}}/>
                    <p>Total: <span style={{fontWeight:"bold"}}>{props.totalPrice},00</span></p>
                </div>
            </div>
            <input type="text" placeholder="search" onChange={props.keywordHandler} value={props.searchKeywords}/>
        </header>
    )
};

export default header;