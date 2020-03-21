import React from "react"
import {TNote} from "../appTypes";
import {ListGroupItem} from "react-bootstrap";

type TProps = {
    onRemove: (id: string) => void
    note: TNote
}

const Note: React.FC<TProps> = ({note: {id, title, date, showButton = true}, onRemove}) => {
    return (
        <ListGroupItem as='li' className={`d-flex justify-content-between ${id === 'default' && 'position-absolute'}`}>
            <div>
                <strong className='mr-3'>{title}</strong>
                <small>{date}</small>
            </div>
        {
            showButton === false ?
                <></> :
                <button
                    type='button'
                    className='btn btn-outline-danger btn-sm font-weight-bold align-self-center'
                    onClick={() => onRemove(id)}
                >&times;</button>
        }
        </ListGroupItem>
    )
};

export default Note;
