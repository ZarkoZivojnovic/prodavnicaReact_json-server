import React from "react";
import LoginModal from "./loginModal";
import SignInModal from "./signInModal";
import BasketModal from "./basketModal";


const typeOfModal = (props) => {
    if (props.type === "shoppingBasket") {
        return <BasketModal totalPrice={props.totalPrice}
                            show={props.basketModal}
                            hideModal={props.hideModal}
                            user={props.loggedUser}
                            allArticles={props.allArticles}
                            addOneMore={props.addOneMoreArticle}
                            removeOneFromBasket={props.removeOneFromBasket}
                            list={props.list}/>
    } else if (props.type === "loginModal") {
        return <LoginModal login={props.login} hideModal={props.hideModal}/>
    } else if (props.type === "signInModal") {
        return <SignInModal addNewUser={props.addNewUser} hideModal={props.hideModal}/>
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