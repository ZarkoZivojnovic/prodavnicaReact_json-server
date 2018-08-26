import React, { Component } from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

const articlesJSON = "http://localhost:3004/articles",
    usersJSON = "http://localhost:3004/users";

class App extends Component {
    state = {
        searchKeywords: "",
        allArticles: [],
        articlesToShow: [],
        shoppingBasket: [],
        totalPrice: 0,
        loggedUser: "",
        modal: false,
        loginModal:false,
        signInModal:false
    };

    signOut = (event) => {
        event.preventDefault();
        this.setState({
            loggedUser:""
        })
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
            [element]:true
        })
    };

    hideModal = (element) => {
        this.setState({
            [element]:false
        })
    };

    addToBasket = (event) => {
        const id= parseInt(event.target.id, 10),
            basket = [...this.state.shoppingBasket],
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
                                loggedUser: username
                            });
                            this.hideModal("loginModal");
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

    render() {
        return (
            <div className="App">
                <Header searchKeywords={this.state.searchKeywords} keywordHandler={this.searchForArticle}
                        totalPrice={this.state.totalPrice} showModal={this.showModal} loggedUser={this.state.loggedUser} signOut={this.signOut}/>
                <Main articles={this.state.articlesToShow} addToBasket={this.addToBasket}/>
                <Footer/>
                <Modal type="shoppingBasket" list={this.state.shoppingBasket} totalPrice={this.state.totalPrice} show={this.state.modal} hideModal={this.hideModal}/>
                <Modal type="loginModal" login={this.login} hideModal={this.hideModal} show={this.state.loginModal}/>
                <Modal type="signInModal" addNewUser={this.addNewUser} hideModal={this.hideModal} show={this.state.signInModal}/>
            </div>
        );
    }
}

export default App;