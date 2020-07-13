import React from "react"

function Header(props) {
    return(
        <div>
         <h1>{props.temp}</h1>
        <h1>{props.raining}</h1>
        </div>
    )
}


export default Header