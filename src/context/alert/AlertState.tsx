import React, {useReducer} from "react"
import {AlertContext} from "./alertContext"
import {alertReducer} from "./alertReducer"
import {HIDE_ALERT, SHOW_ALERT} from "../actionTypes"

export type TAlertType = 'success' | 'danger' | 'warning'
export const alertInitialState = {
    show: (text:string, type?:TAlertType) => {},
    hide: () => {},
    error: (message:string) => {},
    text: '' as string | null,
    type: '' as TAlertType | null,
    visible: false
}
export type TAlertState = typeof alertInitialState
export const AlertState:React.FC = ({children}) => {
    const [state, dispatch] = useReducer(alertReducer, alertInitialState)
    const show = (text:string, type:string = 'warning') => {
        dispatch({
            type: SHOW_ALERT,
            payload: {text, type}
        })
    }
    const error = (message:string) => {
        show(`Что-то пошло не так: ${message}`, 'danger')
    }
    const hide = () => {
        dispatch({type: HIDE_ALERT})
    }
    return (
        <AlertContext.Provider value={{
            ...state, show, hide, error,

        }}>
            {children}
        </AlertContext.Provider>
    )
}
