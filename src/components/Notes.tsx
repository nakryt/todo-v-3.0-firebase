import React from "react"
import {TNotes} from "../appTypes";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Note from "./Note";
import {ListGroupItem} from "react-bootstrap";


type TProps = {
    notes: TNotes
    onRemove: (id: string) => void
}

const Notes: React.FC<TProps> = ({notes, onRemove}) => {

    if (!notes.length) {
        return <ListGroupItem>Список пуст</ListGroupItem>
    }
    return (

        <TransitionGroup component={'ul'} className={'list-group'}>
            {notes.map(note =>
            <CSSTransition key={note.id} timeout={800} classNames={'note'}>
                <Note onRemove={onRemove} note={note}/>
            </CSSTransition>)}
        </TransitionGroup>
    )
}

export default Notes;
