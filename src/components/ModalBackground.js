import React from "react";

const modalBackground = (props) => {
    return(
        <div className="background" onClick={props.hideAllModals} style={{display:props.show?"block":"none"}}> </div>
    )
};

export default modalBackground;