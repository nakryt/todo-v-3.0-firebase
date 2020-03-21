import {HIDE_ALERT, SHOW_ALERT, TAlertActions} from "../actionTypes";
import {TAlertState} from "./AlertState";

export const alertReducer = (state:TAlertState, action:TAlertActions) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, ...action.payload, visible: true }
        case HIDE_ALERT:
            return { ...state, visible: false }
        default:
            return state

    }
}
