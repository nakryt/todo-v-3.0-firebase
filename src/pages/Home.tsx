import React, {useContext, useEffect} from "react"
import Form from "../components/Form";
import Notes from "../components/Notes";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import Loader from "../components/Loader";

const Home: React.FC = () => {
    const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext)
    const removeNoteHandler = async (id: string) => {
        await removeNote(id)
    }
    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Form />
            <hr/>
            { loading ? <Loader size={4}/> : <Notes notes={notes} onRemove={removeNoteHandler}/> }

        </>
    )
};

export default Home;
