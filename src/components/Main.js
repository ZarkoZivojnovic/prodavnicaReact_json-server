import React from "react";
import Articles from "./Articles"

const main = (props) => {
    return(
        <div className="main_content_div">
            <Articles articlesToShow={props.articles} addToBasket={props.addToBasket}/>
        </div>
    )
};

export default main;