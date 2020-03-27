import React, { useState } from "react"
import {TNote} from "../appTypes";
import {ListGroupItem} from "react-bootstrap";

type TProps = {
    onRemove: (id: string) => void
    onChange: (id: string, title: string) => void
    note: TNote
}

const Note: React.FC<TProps> = ({note: {id, title, date, showButton = true}, onRemove, onChange}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [editText, setEditText] = useState(title)
    const changeEditTextHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value)
    }
    const saveHandler = () => {
        onChange(id, editText)
        setIsEdit(false)
    }
    const cancelHandler = () => {
        setEditText(title)
        setIsEdit(false)
    }
    
    return (
        <ListGroupItem as='li' className={`d-flex justify-content-between align-items-center ${id === 'default' && 'position-absolute'}`}>
        {
            isEdit ?
                <form className='editInputWrap' onSubmit={saveHandler} >
                    <input
                        className='pl-2 pr-5 d-flex flex-grow-1'
                        value={editText}
                        onChange={changeEditTextHandler}
                        autoFocus
                    />
                    <div className='editIconsWrap'>
                        <i className='fa fa-check mr-2 text-success' onClick={saveHandler} />
                        <i className='fa fa-times text-danger' onClick={cancelHandler} />
                    </div>
                </form> :
                <div>
                    <strong className='mr-3'>{title}</strong>
                    <small>{date}</small>
                </div>
        }
        {
            showButton === false ?
                null :
                <div>
                    <button
                        type='button'
                        className='btn btn-outline-success btn-sm font-weight-bold align-self-center mr-2'
                        onClick={() => {
                            setIsEdit(true)
                        }}
                    ><i className='fa fa-edit' /></button>
                    <button
                        type='button'
                        className='btn btn-outline-danger btn-sm font-weight-bold align-self-center'
                        style={{width: 31}}
                        onClick={() => onRemove(id)}
                    ><i className='fa fa-times' /></button>
                </div>
        }
        </ListGroupItem>
    )
};

export default Note;
