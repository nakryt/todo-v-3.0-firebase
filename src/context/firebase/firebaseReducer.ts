import { SHOW_LOADER, TNoteActions, ADD_NOTE, EDIT_NOTE, FETCH_NOTES, REMOVE_NOTE, CHANGE_IMPORTANT_PROP, CHANGE_DONE_PROP } from "../actionTypes";
import { TFirebaseState } from "./FirebaseState";
import { createDefaultNote } from "./FirebaseState";

export const firebaseReducer = (state: TFirebaseState, action: TNoteActions) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }
        case ADD_NOTE:
            if (state.notes.length === 1 && state.notes[0].id === 'default') {
                return { ...state, notes: [action.payload], loading: false }
            }
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map(item =>
                    item.id === action.payload.id ?
                        { ...item, date: action.payload.date, title: action.payload.title } :
                        item)
            }
        case FETCH_NOTES:
            return {
                ...state,
                notes: action.payload,
                loading: false
            }
        case REMOVE_NOTE:
            const notes = state.notes.filter(note => note.id !== action.id)
            if (!notes.length) {
                return {
                    ...state,
                    notes: [createDefaultNote()]
                }
            }
            return { ...state, notes }
        case CHANGE_IMPORTANT_PROP:
            return {
                ...state,
                notes: state.notes.map(item =>
                    item.id === action.id ? { ...item, important: !item.important } : { ...item })
            }
        case CHANGE_DONE_PROP:
            return {
                ...state,
                notes: state.notes.map(item =>
                    item.id === action.id ? { ...item, done: !item.done } : { ...item })
            }
        default:
            return state
    }
}
