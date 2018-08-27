import React from "react";

const loginModal = (props) => {
    return (
        <div>
            <form action="?" onSubmit={event => {
                event.preventDefault();
                props.login()
            }}>
                <label htmlFor="username">Username:</label>
                <br/>
                <input type="text" id="username"/>
                <br/>
                <label htmlFor="pass">Password:</label>
                <br/>
                <input type="password" id="pass"/>
                <br/>
                <input type="submit" className="btn"/>
            </form>
            <button className="btn close_modal" onClick={event => {
                props.hideModal("loginModal")}}>X</button>
        </div>
    )
};

export default loginModal;