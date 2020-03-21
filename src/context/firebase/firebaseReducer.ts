import {SHOW_LOADER, TNoteActions, ADD_NOTE, FETCH_NOTES, REMOVE_NOTE} from "../actionTypes";
import {TFirebaseState} from "./FirebaseState";
import {createDefaultNote} from "./FirebaseState";

export const firebaseReducer = (state:TFirebaseState, action:TNoteActions) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }
        case ADD_NOTE:
            if (state.notes.length === 1 && state.notes[0].id === 'default') {
                return { ...state, notes: [action.payload], loading: false }
            }
            return {
                ...state,
                notes: [ ...state.notes, action.payload ]
            }
        case FETCH_NOTES:
            return {
                ...state,
                notes: action.payload,
                loading: false
            }
        case REMOVE_NOTE:
            const notes = state.notes.filter(note => note.id !== action.payload)
            if (!notes.length) {
                return {
                    ...state,
                    notes: [createDefaultNote()]
                }
            }
            return { ...state, notes }
        default:
            return state
    }
}
