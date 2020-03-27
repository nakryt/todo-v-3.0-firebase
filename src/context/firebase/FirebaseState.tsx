import React, {useContext, useReducer} from "react"
import { FirebaseContext } from "./firebaseContext";
import {firebaseReducer} from "./firebaseReducer";
import {TNote, TNotes} from "../../appTypes";
import {ADD_NOTE, EDIT_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, CHANGE_IMPORTANT_PROP, CHANGE_DONE_PROP} from "../actionTypes";
import axios from 'axios'
import {AlertContext} from "../alert/alertContext";

const url = process.env.REACT_APP_DB_URL

export type TFirebaseState = {
    notes: TNotes
    loading: boolean,
    showLoader: () => void
    addNote: (title: string) => Promise<number>
    editNote: (note: TNote, title: string) => Promise<number>
    removeNote: (id: string) => Promise<number>
    fetchNotes: () => void
    changeImportantProp: (id: string) => void
    changeDoneProp: (id: string) => void
}
export const firebaseInitialState:TFirebaseState = {
    notes: [],
    loading: true,
    showLoader: () => {},
    addNote: title => new Promise(() => {}),
    editNote: (note, title) => new Promise(() => {}),
    removeNote: id => new Promise(() => {}),
    fetchNotes: () => {},
    changeImportantProp: (id) => {},
    changeDoneProp: (id) => {}
}
export const createDefaultNote = ():TNote =>
    ({ id: 'default', title: 'Список пуст', showButton: false, important: false, done: false })
const FirebaseState: React.FC = ({children}) => {
    const alert = useContext(AlertContext)
    const [state, dispatch] = useReducer(firebaseReducer, firebaseInitialState)
    const showLoader = () => dispatch({ type: SHOW_LOADER })
    const fetchNotes = async () => {
        try {
            showLoader()
            const res = await axios.get(`${url}/notes.json`)
            if (!res.data) {
                dispatch({ type: FETCH_NOTES, payload: [createDefaultNote()]})
            } else {
                const payload = Object.keys(res.data).map(key => {
                    return {
                        ...res.data[key],
                        id: key
                    }
                })
                dispatch({ type: FETCH_NOTES, payload })
            }
            return 0
        } catch (e) {
            alert.error(e.message)
            setTimeout(fetchNotes, 3000)
        }

    }
    const addNote = async (title: string):Promise<number> => {
        const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const date = new Date().toLocaleString('ru-RU', options)
        const note = { title, date, important: false, done: true }
        try {
            const res = await axios.post(`${url}/notes.json`, note)
            const payload = {
                ...note, id: res.data.name
            }
            dispatch({ type: ADD_NOTE, payload })
            alert.show('Заметка создана', 'success')
            setTimeout(alert.hide, 5000)
            return 0
        } catch (e) {
            alert.error(e.message)
            return 1
        }
    }
    const editNote = async (note: TNote, title: string):Promise<number> => {
        const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const date = new Date().toLocaleString('ru-RU', options)
        const newNote = { ...note, title, date }
        const { id } = note
        try {
            await axios.put(`${url}/notes/${id}.json`, newNote)
            dispatch({ type: EDIT_NOTE, payload: {...newNote} })
            alert.show('Заметка была изменена', 'success')
            setTimeout(alert.hide, 5000)
            return 0
        } catch (e) {
            alert.error(e.message)
            return 1
        }
    }
    const removeNote = async (id: string):Promise<number> => {
        try {
            await axios.delete(`${url}/notes/${id}.json`)
            dispatch({ type: REMOVE_NOTE, id })
            alert.show('Заметка была удалена!')
            setTimeout(alert.hide, 5000)
            return 0
        } catch (e) {
            alert.error(e.message)
            return 1
        }
    }
    const changeImportantProp = async (id: string) => {
        const note = state.notes.find(item => item.id === id)
        const newNote = { ...note, important: !note!.important }
        try {
            await axios.put(`${url}/notes/${id}.json`, newNote)
            dispatch({ type: CHANGE_IMPORTANT_PROP, id })
            return 0
        } catch (e) {
            alert.error(e.message)
        }
    }
    const changeDoneProp = async (id: string) => {
        const note = state.notes.find(item => item.id === id)
        const newNote = { ...note, done: !note!.done }
        try {
            await axios.put(`${url}/notes/${id}.json`, newNote)
            dispatch({ type: CHANGE_DONE_PROP, id })
            return 0
        } catch (e) {
            alert.error(e.message)
        }
    }
    return (
        <FirebaseContext.Provider value={{
            ...state,
            showLoader,
            addNote,
            editNote,
            removeNote,
            fetchNotes,
            changeImportantProp,
            changeDoneProp
        }}>
            {children}
        </FirebaseContext.Provider>
    )
};

export default FirebaseState;
