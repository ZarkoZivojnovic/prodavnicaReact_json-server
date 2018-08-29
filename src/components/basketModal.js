import React from "react";

const articlesListTable = (props) => {
    if (props.list.length === 0) return;
    const sortedList = props.list.sort(function(a, b){
        return a.name === b.name? 0 : +(a.name> b.name) || -1;
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
                price: currentItem.price,
                id: currentItem.id
            }
        }
    }
    return (
        <table className="basketTable">
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
            {columnsForBasketTable(listForPrint, props)}
            </tbody>
        </table>
    )
};

const isItAvailable = (id, {allArticles}) => {
    for (let item in allArticles){
        if (allArticles[item].id === id && allArticles[item].quantity > 0) return false;
    }
    return true;
};

const columnsForBasketTable = (listForPrint, props) => {
    return listForPrint.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price},00</td>
                <td>{item.count}</td>
                <td>{item.price * item.count},00</td>
                <td>
                    <button onClick={event => {props.addOneMore(item.id)}} disabled={isItAvailable(item.id, props)}>+</button>
                    <button onClick={event => {props.removeOneFromBasket(item.id)}}>-</button>
                </td>
            </tr>
        )
    });
};

const checkOutDisable = (props) => {
    return props.user === "" || props.list.length===0;
};

const modalContent = (props) => {
    if (props.checkOut) {
        return (
            <div>
                <form action="?" formAction="post" onSubmit={event => {
                    event.preventDefault();
                    props.checkOutDone();
                }}>
                    <label htmlFor="fName">First Name:</label>
                    <br/>
                    <input type="text" id="fName" placeholder="first name"/>
                    <br/>
                    <label htmlFor="lName">Last Name:</label>
                    <br/>
                    <input type="text" id="lName" placeholder="last name"/>
                    <br/>
                    <label htmlFor="deliveryStreet">Street:</label>
                    <br/>
                    <input type="text" id="deliveryStreet" placeholder="street"/>
                    <br/>
                    <label htmlFor="deliveryTown">Town:</label>
                    <br/>
                    <input type="text" id="deliveryTown" placeholder="town"/>
                    <br/>
                    <label htmlFor="deliveryCountry">Country:</label>
                    <br/>
                    <input type="text" id="deliveryCountry" placeholder="country"/>
                    <br/>
                    <label htmlFor="contactPhone">Phone:</label>
                    <br/>
                    <input type="text" id="contactPhone" placeholder="phone"/>
                    <br/>
                    <input type="submit" className="btn"/>
                </form>
                <button className="btn back" onClick={() => {props.hideModal("checkOutModal")}}>Back</button>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Your shopping cart:</h2>
                <ul>{articlesListTable(props)}</ul>
                <h4 style={{fontWeight: "bold"}}>Total price: {props.totalPrice},00</h4>
                <button className="btn" onClick={event => {
                    props.hideModal("basketModal")
                }}>Continue Shopping</button>
                <button className="btn"
                        onClick={() => {props.showModal("checkOutModal")}}
                        disabled={checkOutDisable(props)}>Checkout</button>
                <button className="btn close_modal"
                        onClick={event => {props.hideModal("basketModal")}}>X</button>
            </div>
        )
    }
};

const basketModal = (props) => {
    return modalContent(props)
};

export default basketModal;