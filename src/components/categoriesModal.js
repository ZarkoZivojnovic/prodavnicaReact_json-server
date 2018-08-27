import React from "react";

const categoriesModal = (props) => {
    return (
        <div>
            <button className="categoryBtn btn" onClick={(event) => {props.categoriesFilter("all")}}>All</button>
            <button className="categoryBtn btn" onClick={(event) => {props.categoriesFilter("category1")}}>Category 1</button>
            <button className="categoryBtn btn" onClick={(event) => {props.categoriesFilter("category2")}}>Category 2</button>
            <button className="categoryBtn btn" onClick={(event) => {props.categoriesFilter("category3")}}>Category 3</button>
            <button className="categoryBtn btn" onClick={(event) => {props.categoriesFilter("category4")}}>Category 4</button>
            <button className="categoryBtn btn" onClick={(event) => {props.categoriesFilter("category5")}}>Category 5</button>
            <button className="btn close_modal" onClick={() => {props.hideModal("showCategoriesModal")}}> X </button>
        </div>
    )
};

export default categoriesModal;