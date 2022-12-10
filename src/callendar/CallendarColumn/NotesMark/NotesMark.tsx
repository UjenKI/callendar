import React, {createRef, FC, useRef} from 'react'; 

import { NoteInterface } from '../../Callendar';

import style from './NotesMark.module.css';

interface NotesMarkInterface {
    dayIn: number
    yearIn: number
    monthIn: number
    notes: NoteInterface[]
}

const NotesMark:FC<NotesMarkInterface> = ({dayIn, yearIn, notes, monthIn}) => {
    let arrCount = []
    const inputDate = new Date(yearIn, monthIn, dayIn).toLocaleString();
    const notesList = notes.map((note, id) => {
        const {date, month, year} = note.noteCreatingDetails;
        const noteDate = new Date(year, month, date).toLocaleString();

        let title = note.noteTitle.length > 8 ? note.noteTitle.substring(0,8) + "..." : note.noteTitle

        if(inputDate === noteDate) {
            arrCount.push(note.id)
            if(arrCount.length <= 2) {
                return (
                    <li key={id} className={style.notes}>
                        <p>{title}</p>
                    </li>
                )
            }
        } else {
            return null
        }

    })

    return (
        <ul className={style.notes__list}>
            {notesList}
            {
                arrCount.length > 2 ? <li className={style.notes + " " + style.notes__count}>
                    <span>+{arrCount.length -2}</span>
                </li> : null
            }
        </ul>
    )
}

export default NotesMark;