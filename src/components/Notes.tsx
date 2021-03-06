import React from "react"
import {TNotes} from "../appTypes";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Note from "./Note";
import {ListGroupItem} from "react-bootstrap";
import {TNote} from "../appTypes";


type TProps = {
    notes: TNotes
    onClick: (id: string) => void
    onRemove: (id: string) => void
    onChange: (note: TNote, title: string) => void
    onImportantClick: (id: string) => void
}

const Notes: React.FC<TProps> = ({notes, onRemove, onChange, onClick, onImportantClick}) => {

    if (!notes.length) {
        return <ListGroupItem>Список пуст</ListGroupItem>
    }
    const sortedNotes = (notes[0].id !== 'default' && notes.length > 1) ?
        notes.slice().sort((a, b) => b.date! - a.date!) : notes
    return (

        <TransitionGroup component={'ul'} className={'list-group'}>
            {sortedNotes.map(note =>
            <CSSTransition key={note.id} timeout={800} classNames={'note'}>
                <Note
                    onRemove={onRemove}
                    note={note}
                    onChange={onChange}
                    onClick={onClick}
                    onImportantClick={onImportantClick}
                />
            </CSSTransition>)}
        </TransitionGroup>
    )
}

export default Notes;
