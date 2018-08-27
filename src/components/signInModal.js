import React from "react";

const signInModal = (props) => {
    return (
        <div>
            <form action="?" onSubmit={event => {
                event.preventDefault();
                props.addNewUser(event)
            }}>
                <label htmlFor="signInUsername">Username:</label>
                <br/>
                <input type="text" id="signInUsername" placeholder="username" required/>
                <br/>
                <label htmlFor="signInEmail">Email:</label>
                <br/>
                <input type="email" id="signInEmail" placeholder="email" required/>
                <br/>
                <label htmlFor="signInPass">Password:</label>
                <br/>
                <input type="password" id="signInPass" placeholder="password" required/>
                <br/>
                <label htmlFor="confirmPass">Password:</label>
                <br/>
                <input type="password" id="confirmPass" placeholder="confirm password" required/>
                <br/>
                <label htmlFor="firstName">First Name:</label>
                <br/>
                <input type="text" id="firstName" placeholder="first name"/>
                <br/>
                <label htmlFor="lastName">Last Name:</label>
                <br/>
                <input type="text" id="lastName" placeholder="last name"/>
                <br/>
                <label htmlFor="street">Street:</label>
                <br/>
                <input type="text" id="street" placeholder="street"/>
                <br/>
                <label htmlFor="town">Town:</label>
                <br/>
                <input type="text" id="town" placeholder="town"/>
                <br/>
                <label htmlFor="country">Country:</label>
                <br/>
                <input type="text" id="country" placeholder="country"/>
                <br/>
                <label htmlFor="phone">Phone:</label>
                <br/>
                <input type="text" id="phone" placeholder="phone"/>
                <br/>
                <input type="submit" className="btn"/>
            </form>
            <button className="btn close_modal" onClick={event => {props.hideModal("signInModal")}}>X</button>
        </div>
    )
};

export default signInModal;