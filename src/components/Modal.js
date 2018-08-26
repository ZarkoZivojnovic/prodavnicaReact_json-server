import React from "react";

const articlesListTable = ({list}) => {
    const sortedList = list.sort((a, b) => {
        return a.id < b.id;
    });
    let listForPrint = [],
        article = {
            name:"",
            index:""
        };
    for (let item in sortedList) {
        const currentItem = sortedList[item];
        if (currentItem.name === article.name) {
            listForPrint[article.index].count++;
        } else {
            article.name = currentItem.name;
            article.index = item;
            listForPrint[article.index] = {
                name: currentItem.name,
                count: 1,
                price: currentItem.price
            }
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Article:</th>
                    <th>Price per piece:</th>
                    <th>Count:</th>
                    <th>Price:</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {columnsForBasketTable(listForPrint)}
            </tbody>
        </table>
    )
};

const columnsForBasketTable = (listForPrint) => {
    return listForPrint.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price},00</td>
                <td>{item.count}</td>
                <td>{item.price * item.count},00</td>
                <td>
                    <button>+</button>
                    <button>-</button>
                </td>
            </tr>
        )
    });
};

const typeOfModal = (props) => {
    if (props.type === "shoppingBasket") {
        return (
            <div>
                <h2>Your shopping cart:</h2>
                <ul>{articlesListTable(props)}</ul>
                <h4 style={{fontWeight: "bold"}}>Total price: {props.totalPrice},00</h4>
                <button className="btn" onClick={event => {
                    props.hideModal("modal")
                }}>Continue Shopping
                </button>
                <button className="btn" onClick={() => {
                    alert("checkout")
                }}>Checkout
                </button>
                <button className="btn close_modal" onClick={event => {
                    props.hideModal("modal")
                }}>X
                </button>
            </div>
        )
    } else if (props.type === "loginModal") {
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
                    props.hideModal("loginModal")
                }}>X
                </button>
            </div>
        )
    } else if (props.type === "signInModal") {
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
    }
};

const modal = (props) => {
    return (
        <div className="modal" style={{top: props.show ? "100px" : "-200vh"}}>
            {typeOfModal(props)}
        </div>
    )
};

export default modal;