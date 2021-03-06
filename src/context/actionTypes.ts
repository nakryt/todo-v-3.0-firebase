import {TNote, TNotes} from "../appTypes";

export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'
export type TAlertShow = {
    type: typeof SHOW_ALERT
    payload: object
}
export type TAlertHide = {
    type: typeof HIDE_ALERT
}

export const SHOW_LOADER = 'SHOW_LOADER'
export const ADD_NOTE = 'ADD_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'
export const FETCH_NOTES = 'FETCH_NOTES'
export const REMOVE_NOTE = 'REMOVE_NOTE'
export const CHANGE_IMPORTANT_PROP = 'CHANGE_IMPORTANT_PROP'
export const CHANGE_DONE_PROP = 'CHANGE_DONE_PROP'

export type TShowLoader = {
    type: typeof SHOW_LOADER
}
export type TAddNote = {
    type: typeof ADD_NOTE
    payload: TNote
}
export type TEditNote = {
    type: typeof EDIT_NOTE
    payload: TNote
}
export type TFetchNotes = {
    type: typeof FETCH_NOTES
    payload: TNotes
}
export type TRemoveNote = {
    type: typeof REMOVE_NOTE
    id: string
}
export type TChangeImportantProp = {
    type: typeof CHANGE_IMPORTANT_PROP
    id: string
}
export type TChangeDoneProp = {
    type: typeof CHANGE_DONE_PROP
    id: string
}

export type TAlertActions = TAlertShow | TAlertHide
export type TNoteActions = TShowLoader | TAddNote | TEditNote |
    TFetchNotes | TRemoveNote | TChangeImportantProp | TChangeDoneProp
