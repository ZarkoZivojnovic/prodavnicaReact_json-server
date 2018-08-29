import React from "react";
import noPhoto from "../../src/graph/no-image-icon.png";

const articleModal = (props) => {
    if (props.targetedArticle !== null) {
        return (
            <div className="article_preview">
                <div>
                    <img src={props.targetedArticle.photo === "none" ? noPhoto : props.targetedArticle.photo}
                         alt={props.targetedArticle.name} style={{width: "150px", height: "auto"}}/>
                </div>

                <div>
                    <h3>{props.targetedArticle.name}</h3>
                    <p>{props.targetedArticle.description}</p>
                    <h4>{props.targetedArticle.price} din.</h4>
                    <button className="btn" id={props.targetedArticle.id}
                            onClick={() => {props.addToBasket(props.targetedArticle.id)}}
                            disabled={!props.targetedArticle.quantity>0}>{props.targetedArticle.quantity>0?"Add to basket":"Not available"}</button>
                </div>

                <button className="btn close_modal" onClick={() => {
                    props.hideModal("articleModal")
                }}>X
                </button>
            </div>
        );
    }
    return (
        <div>
            <p>article</p>
            <button className="btn close_modal" onClick={() => {
                props.hideModal("articleModal")
            }}>X
            </button>
        </div>
    );
}
export default articleModal;