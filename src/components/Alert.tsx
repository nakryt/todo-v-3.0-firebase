import React, {useContext} from "react"
import {AlertContext} from "../context/alert/alertContext";
import {CSSTransition} from 'react-transition-group'

const Alert: React.FC = () => {
    const {visible, text, type, hide} = useContext(AlertContext)

    return (
        <div className={'alert-wrapper'}>

            <CSSTransition
                timeout={{
                    enter: 500,
                    exit: 350
                }}
                in={visible}
                classNames='alert'
                mountOnEnter
                unmountOnExit
            >
                <div className={`alert alert-${type || 'warning'} alert-dismissible`}>
                    {text}
                    <button onClick={hide} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </CSSTransition>
        </div>
    )
};

export default Alert;
