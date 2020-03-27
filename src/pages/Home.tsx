import React, {useContext, useEffect} from "react"
import Form from "../components/Form";
import Notes from "../components/Notes";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import Loader from "../components/Loader";
import {TNote} from "../appTypes";

const Home: React.FC = () => {
    const { loading, notes, fetchNotes, removeNote, editNote, changeImportantProp, changeDoneProp } = useContext(FirebaseContext)
    const removeNoteHandler = async (id: string) => {
        await removeNote(id)
    }
    const changeNoteHandler = async (note: TNote, title: string) => {
        editNote(note, title)
    }
    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Form />
            <hr/>
            {
                loading ? <Loader size={4}/> :
                    <Notes
                        notes={notes}
                        onRemove={removeNoteHandler}
                        onChange={changeNoteHandler}
                        onClick={changeDoneProp}
                        onImportantClick={changeImportantProp}
                    />
            }

        </>
    )
};

export default Home;
