import React, { useState } from "react"
import { TNote } from "../appTypes";
import { ListGroupItem } from "react-bootstrap";

type TProps = {
    onClick: (id: string) => void
    onRemove: (id: string) => void
    onChange: (note: TNote, title: string) => void
    onImportantClick: (id: string) => void
    note: TNote
}

const Note: React.FC<TProps> = ({ note, onRemove, onChange, onClick, onImportantClick }) => {
    const { id, title, date, important, done, showButton = true } = note
    const [isEdit, setIsEdit] = useState(false)
    const [editText, setEditText] = useState(title)
    const changeEditTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value)
    }
    const saveHandler = (e:React.FormEvent) => {
        e.preventDefault()
        onChange(note, editText)
        setIsEdit(false)
    }
    const cancelHandler = () => {
        setEditText(title)
        setIsEdit(false)
    }

    return (
        <ListGroupItem as='li'
            className={`d-flex justify-content-between align-items-center ${id === 'default' && 'position-absolute'}`}
        >
            {
                isEdit ?
                    <form className='editInputWrap mr-2' onSubmit={saveHandler} >
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
                    <div className='btn' onClick={() => onClick(id)}>
                        {
                            done ?
                                <s>
                                    <span className={`mr-3 ${important && 'text-danger'}`}>
                                        {title}
                                    </span>
                                    <small>{date}</small>
                                </s> :
                                <>
                                    <strong className={`mr-3 ${important && 'text-danger'}`}>
                                        {title}
                                    </strong>
                                    <small>{date}</small>
                                </>
                        }
                    </div>
            }
            {
                showButton === false ?
                    null :
                    <div className='editIcons' >
                        <button
                            type='button'
                            className={`btn btn-sm font-weight-bold align-self-center mr-2 ${important ? 'btn-info' : 'btn-outline-info'}`}
                            onClick={() => onImportantClick(id)}
                            title={important ? 'Сделать заметку обычной' : 'Сделать заметку важной'}
                        ><i className="fa fa-exclamation" /></button>

                        <button
                            type='button'
                            className='btn btn-outline-success btn-sm font-weight-bold align-self-center mr-2'
                            onClick={() => {
                                setIsEdit(true)
                            }}
                            title='Отредактировать заметку'
                        ><i className='fa fa-edit' /></button>
                        <button
                            type='button'
                            className='btn btn-outline-danger btn-sm font-weight-bold align-self-center'
                            onClick={() => onRemove(id)}
                            title='Удалить заметку'
                        ><i className='fa fa-times' /></button>
                    </div>
            }
        </ListGroupItem>
    )
};

export default Note;
