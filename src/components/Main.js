import React from "react";
import Articles from "./Articles"

const main = (props) => {
    return(
        <div className="main_content_div">
            <Articles articlesToShow={props.articles}
                      addToBasket={props.addToBasket}
                      showModal={props.showModal}
                      select={props.selectArticle}/>
        </div>
    )
};

export default main;