import React from "react";
import noPhoto from "../../src/graph/no-image-icon.png";

const btnContent = ({quantity}) => {
    if (quantity>0) {
        return "Add to basket";
    }
    return "Not available"
};

const articles = (props) => {
    const list = props.articlesToShow.map((article) => {
        const available = btnContent(article)==="Add to basket";
        return(
            <div className="article_single" key={article.id} onClick={event => {
                if (event.target.nodeName !== "BUTTON") {
                    props.select(article);
                    props.showModal("articleModal");
                }
            }}>
                <img src={article.photo==="none" ? noPhoto : article.photo} alt={article.name} style={{width:"100px", height:"auto"}}/>
                <h3>{article.name}</h3>
                <p>{article.price} din.</p>
                <button className="btn" id={article.id} onClick={props.addToBasket} disabled={!available}>{btnContent(article)}</button>
            </div>
        )
    });
    return(
        <div className="main_content_div">{list}</div>
    )
};

export default articles;