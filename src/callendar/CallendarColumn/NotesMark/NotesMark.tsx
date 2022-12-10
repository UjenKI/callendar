import React, {FC} from 'react'; 

import { NoteInterface } from '../../Callendar';

import style from './NotesMark.module.css';

interface NotesMarkInterface {
    dayIn: number
    yearIn: number
    monthIn: number
    notes: NoteInterface[]
}

const NotesMark:FC<NotesMarkInterface> = ({dayIn, yearIn, notes, monthIn}) => {
    const inputDate = new Date(yearIn, monthIn, dayIn).toLocaleString();
    const notesList = notes.map((note, id) => {
        const {date, month, year} = note.noteCreatingDetails;
        const noteDate = new Date(year, month, date).toLocaleString();

        if(inputDate === noteDate) {
            return (
                <li key={id} className={style.notes}>
                    <p>{note.noteTitle}</p>
                </li>
            )
        } else {
            return null
        }

    })

    return (
        <ul className={style.notes__list}>
            {notesList}
        </ul>
    )
}

export default NotesMark;