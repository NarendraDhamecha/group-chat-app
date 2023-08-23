import { Fragment } from "react";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  return(
    <div className={`modal show`} style={{position: "fixed", display: "block", backgroundColor: "rgba(0, 0, 0, 0.75)"}}>{props.children}</div>
  )
} 

const id = document.getElementById("overlay")

const ModalOverlay = (props) => {
  return  (
    <Fragment>
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, id)}
    </Fragment>
  ) 
}

export default ModalOverlay;