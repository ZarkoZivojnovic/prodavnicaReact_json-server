import React, { Component } from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import ModalBackground from "./components/ModalBackground";

const articlesJSON = "http://localhost:3004/articles",
    usersJSON = "http://localhost:3004/users";

class App extends Component {
    state = {
        searchKeywords: "",
        allArticles: [],
        articlesToShow: [],
        shoppingBasket: localStorage.getItem("shoppingBasket")!==null ? JSON.parse(localStorage.getItem("shoppingBasket")):[],
        totalPrice: localStorage.getItem("totalPrice")!==null ? JSON.parse(localStorage.getItem("totalPrice")):0,
        loggedUser: localStorage.getItem("loggedUser")!==null ? JSON.parse(localStorage.getItem("loggedUser")):"",
        basketModal: false,
        loginModal:false,
        signInModal:false,
        showCategoriesModal: false,
        checkOutModal: false,
        articleModal:false,
        targetedArticle: null,
        background:false
    };

    signOut = (event) => {
        event.preventDefault();
        this.setState({
            loggedUser:""
        });
        localStorage.removeItem("loggedUser");
    };

    componentDidMount() {
        fetch(articlesJSON, {method: "GET"})
            .then(response => response.json())
            .then(json => {
                this.setState({
                    allArticles: json,
                    articlesToShow: json
                })
            })
    }

    searchForArticle = (event) => {
        const keyword = event.target.value,
            arr = [];
        for (let article of this.state.allArticles) {
            if (article.name.includes(keyword)) {
                arr.push(article);
            }
        }
        this.setState({
            searchKeywords:keyword,
            articlesToShow: arr
        });
    };

    showModal = (element) => {
        this.setState({
            [element]:true,
            background:true
        })
    };

    hideModal = (element) => {
        this.setState({
            [element]:false,
            background:false
        });
        if (element === "articleModal") {
            setTimeout(() => {this.setState({targetedArticle:null})},1e3);
        }
    };

    addToBasket = (event) => {
        const id= parseInt(event.target.id, 10);
        const basket = [...this.state.shoppingBasket],
            allArticles = [...this.state.allArticles];
        for (let article of this.state.articlesToShow) {
            if (id === article.id){
                allArticles[id].quantity--;
                let item = {...article};
                item["basketId"] = basket.length;
                basket.push(item);
            }
        }
        let total = basket.map(article => article.price).reduce((total, price) => total+price);
        this.setState({
            shoppingBasket:basket,
            allArticles,
            totalPrice:total
        });
        localStorage.setItem("shoppingBasket", JSON.stringify(basket));
        localStorage.setItem("totalPrice", JSON.stringify(total));
        this.quantityHandler(id, allArticles[id].quantity);
    };

    quantityHandler = (id, count) => {
        const articlesURL = "http://localhost:3004/articles";
        fetch(`${articlesURL}/${id}`,{
            method:"PATCH",
            headers:{
                "Accept":"application/json",
                "Content-type":"application/json"
            },
            body:JSON.stringify({quantity: count})
        })
    };

    addNewUser = () => {
        const obj = {
            username:document.getElementById("signInUsername").value,
            email: document.getElementById("signInEmail").value,
            password: document.getElementById("signInPass").value,
            confirmPass: document.getElementById("confirmPass").value,
            phone: document.getElementById("phone").value,
            address: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                street: document.getElementById("street").value,
                town: document.getElementById("town").value,
                country: document.getElementById("country").value
            },
        };
        if (obj.password !== obj.confirmPass) {
            alert("pass nije isti"); 
            return;
        }
        const freeUsername = this.isUsernameFree(obj.username);
        freeUsername.then(response => {
            if (!response) {
                alert("zauzet username");
            } else {
                this.addToDb(obj);
            }
        })
    };

    isUsernameFree = (username) => {
        let answer;
        return new Promise(resolve =>{
            fetch(usersJSON, {method: "GET"})
                .then(response => response.json())
                .then(json => {
                    for (let data of json){
                        if (data.username === username){
                            answer = false;
                        }
                    }
                    answer = true;
                });
            resolve(answer);
        })
    };

    addToDb = (obj) => {
        fetch(usersJSON,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(obj)
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    loggedUser: obj.username
                });
                this.hideModal("signInModal");
            },1500)
        }).catch(err => alert(err))
    };

    login = () => {
        const username = document.getElementById("username").value,
            password = document.getElementById("pass").value;

        fetch(usersJSON, {method: "GET"})
            .then(response => response.json())
            .then(json => {
                for (let data of json){
                    if (data.username === username){
                        if (data.password === password){
                            this.setState({
                                loggedUser: data
                            });
                            this.hideModal("loginModal");
                            localStorage.setItem("loggedUser", JSON.stringify(data));
                            return;
                        } else {
                            alert("pogresan pass");
                            return;
                        }
                    }
                }
                alert("username ne postoji");
            });
    };

    addOneMoreArticle = (id) => {
        const basket = [...this.state.shoppingBasket],
            allArticles = [...this.state.allArticles];
        for (let article of allArticles) {
            if (id === article.id){
                allArticles[id].quantity--;
                let item = {...article};
                item["basketId"] = basket.length;
                basket.push(item);
            }
        }
        let total = basket.map(article => article.price).reduce((total, price) => total+price);
        this.setState({
            shoppingBasket:basket,
            allArticles,
            totalPrice:total
        });
        localStorage.setItem("shoppingBasket", JSON.stringify(basket));
        localStorage.setItem("totalPrice", JSON.stringify(total));
        this.quantityHandler(id, allArticles[id].quantity);
    };

    removeOneFromBasket = (id) => {
        let basket = [...this.state.shoppingBasket],
            allArticles = [...this.state.allArticles],
            totalPrice = this.state.totalPrice;
        for (let article in basket) {
            if (id === basket[article].id){
                allArticles[id].quantity++;
                totalPrice -= allArticles[id].price;
                delete basket[article];
                break;
            }
        }
        basket = basket.sort((a,b) => a.basketId<b.basketId).slice(0,basket.length-1);
        this.setState({
            shoppingBasket:basket,
            allArticles,
            totalPrice
        });
        localStorage.setItem("shoppingBasket", JSON.stringify(basket));
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        this.quantityHandler(id, allArticles[id].quantity);
    };

    categoriesFilter = (category) => {
        let arr;
        if (category === "all"){
            arr = this.state.allArticles;
        } else {
            arr = this.state.allArticles.filter(item => {
                return item["category"] === category;
            })
        }
        this.setState({
            articlesToShow: arr
        });
        this.hideModal("showCategoriesModal");
    };

    checkOutDone = () => {
        alert("done!");
        this.setState({
            shoppingBasket:[],
            totalPrice:0,
            checkOutModal:false,
            basketModal:false,
            background:false
        });
        localStorage.removeItem("shoppingBasket");
        localStorage.removeItem("totalPrice");
    };

    selectArticle = (article) => {
        this.setState({targetedArticle:article})
    };

    hideAllModals = () => {
        this.setState({
            basketModal: false,
            loginModal:false,
            signInModal:false,
            showCategoriesModal: false,
            checkOutModal: false,
            articleModal:false,
            targetedArticle: null,
            background:false
        })
    };

    render() {
        return (
            <div className="App">
                <Header searchKeywords={this.state.searchKeywords}
                        keywordHandler={this.searchForArticle}
                        totalPrice={this.state.totalPrice}
                        showModal={this.showModal}
                        loggedUser={this.state.loggedUser}
                        signOut={this.signOut}/>
                <Main articles={this.state.articlesToShow}
                      addToBasket={this.addToBasket}
                      showModal={this.showModal}
                      selectArticle={this.selectArticle}/>
                <Footer/>
                <ModalBackground hideAllModals={this.hideAllModals} show={this.state.background}/>
                <Modal type="shoppingBasket" list={this.state.shoppingBasket}
                       totalPrice={this.state.totalPrice}
                       show={this.state.basketModal}
                       hideModal={this.hideModal}
                       showModal={this.showModal}
                       user={this.state.loggedUser}
                       allArticles={this.state.allArticles}
                       addOneMore={this.addOneMoreArticle}
                       checkOut={this.state.checkOutModal}
                       checkOutDone={this.checkOutDone}
                       removeOneFromBasket={this.removeOneFromBasket}/>
                <Modal type="loginModal" login={this.login} hideModal={this.hideModal} show={this.state.loginModal}/>
                <Modal type="signInModal" addNewUser={this.addNewUser} hideModal={this.hideModal} show={this.state.signInModal}/>
                <Modal type="categoriesModal"
                       allArticles={this.state.allArticles}
                       categoriesFilter={this.categoriesFilter}
                       show={this.state.showCategoriesModal}
                       hideModal={this.hideModal}/>
                <Modal type="articleModal"
                       hideModal={this.hideModal}
                       targetedArticle={this.state.targetedArticle}
                       show={this.state.articleModal}
                       addToBasket={this.addOneMoreArticle}/>
            </div>
        );
    }
}

export default App;