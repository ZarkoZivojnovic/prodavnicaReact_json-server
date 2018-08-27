import React, {Component} from "react";
import LoginModal from "./loginModal";
import SignInModal from "./signInModal";
import BasketModal from "./basketModal";
import CategoriesModal from "./categoriesModal";

class Modal extends Component {
    typeOfModal = (props) => {
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
        } else if (props.type === "categoriesModal"){
            return <CategoriesModal categoriesFilter={props.categoriesFilter} hideModal={props.hideModal}/>
        }
    };

    render(){
        return (
            <div className="modal" style={{top: this.props.show ? "100px" : "-200vh"}}>
                {this.typeOfModal(this.props)}
            </div>
        )
    }
}

export default Modal;