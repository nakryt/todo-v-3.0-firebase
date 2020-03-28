import React, { useState } from "react"
import { TNote } from "../appTypes";
import { ListGroupItem } from "react-bootstrap";
import getWindowSize from "../utils/getWindowSize"

type TProps = {
    onClick: (id: string) => void
    onRemove: (id: string) => void
    onChange: (note: TNote, title: string) => void
    onImportantClick: (id: string) => void
    note: TNote
}
type TInputChange = React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>

const Note: React.FC<TProps> = ({ note, onRemove, onChange, onClick, onImportantClick }) => {
    const { id, title, date, important, done, showButton = true } = note
    const formatDateOptions = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formatedDate = date ? new Date(date).toLocaleString('ru-RU', formatDateOptions) : null
    const [isEdit, setIsEdit] = useState(false)
    const [editText, setEditText] = useState(title)
    const changeEditTextHandler = (e: TInputChange) => {
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

    const { width: windowWidth } = getWindowSize()
    return (
        <ListGroupItem as='li'
            className={`d-flex justify-content-between align-items-center ${id === 'default' && 'position-absolute'}`}
        >
            {
                isEdit ?
                    <form className='editInputWrap mr-2' onSubmit={saveHandler} >
                        {
                            windowWidth && windowWidth > 768 ? 
                            <input
                                className='px-2 d-flex flex-grow-1 editInput'
                                value={editText}
                                onChange={changeEditTextHandler}
                                autoFocus
                            /> :
                            <textarea
                                className='px-2 d-flex flex-grow-1 editInput'
                                value={editText}
                                onChange={changeEditTextHandler}
                                autoFocus
                            />
                        }
                        

                        <div className='editIconsWrap'>
                            <i className='fa fa-check mr-3 text-success' title='Сохранить' onClick={saveHandler} />
                            <i className='fa fa-times text-danger' title='Отмена' onClick={cancelHandler} />
                        </div>
                    </form> :
                    <div className='cursor-pointer' onClick={() => onClick(id)}>
                        {
                            done ?
                                <>
                                    <s>
                                        <span className={`mr-3 ${important && 'text-danger'}`}>
                                            {title}
                                        </span>
                                    </s>
                                    <small className='date'>{formatedDate}</small>
                                </> :
                                <>
                                    <strong className={`mr-3 ${important ? 'text-danger' : ''}`}>
                                        {title}
                                    </strong>
                                    <small className='date'>{formatedDate}</small>
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
