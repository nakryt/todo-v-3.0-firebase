import React, {useContext} from "react"
import {useForm} from "react-hook-form"
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export type TFormData = {
    note: string
}

const Form: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<TFormData>()
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)
    const submitHandler = async ({note}:TFormData) => {
        if (note.trim()) {
            if (await firebase.addNote(note.trim()) === 0) {
                reset()
            }
        } else {
            alert.show('Введите заметку')
        }
    }
    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <div className='form-group d-flex'>
                <input
                    ref={register}
                    name="note"
                    type="text"
                    className="form-control mr-2"
                    placeholder="Введите заметку"
                    autoComplete={'off'}
                />
                <button className='btn btn-primary'>Добавить</button>
            </div>
        </form>
    )
}

export default Form;
