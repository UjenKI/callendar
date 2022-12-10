import React, { FC, useState, useRef, createRef } from 'react';
import { weekDays, daysArr, monthNames } from '../../defaultData/defConfig';
import { NoteInterface } from '../Callendar';
import style from './CallendarNotes.module.css';

interface CallendarNotesProps {
    isOpened: boolean
    selectedDate: number
    month: number
    year: number
    notes: NoteInterface[]
    closeNote: () => void
    setNotes: (note: NoteInterface) => void
}

const CallendarNotes: FC<CallendarNotesProps> = ({ setNotes, notes, closeNote, month, year, selectedDate, isOpened }) => {
    const [title, setTitle] = useState<string>('')
    const [noteText, setNoteText] = useState<string | null>(null)
    const [isOpenForm, setIsOpenForm] = useState(false);

    const date = new Date(year, month, selectedDate);
    const dayInWeek = weekDays[date.getDay() - 1]
    const dateNum = date.getDate()
    const monthName = monthNames[month];

    const closingNote = () => {
        closeNote()
        setIsOpenForm(false)
    }

    const openNoteForm = () => {
        setIsOpenForm(true)
    }

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsOpenForm(false)

        const creationDate = new Date()
        const creationDay = creationDate.getDay();
        const createNoteDate = creationDate.toLocaleString().replace(/\//g, '.');
        const createNoteTime = creationDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
        const noteObj = {
            id: notes.length + 1,
            noteTitle: title,
            noteText: noteText,
            noteDate: createNoteDate,
            noteCreatingDetails: {
                date: selectedDate,
                day: creationDay,
                year: year,
                month: month,
                time: createNoteTime
            }
        }
        setTitle('')
        setNoteText('')
        setNotes(noteObj);
    }

    const inputDate = new Date(year, month, selectedDate).toLocaleString();

    const notesList = notes.map((note, id) => {
        const { noteCreatingDetails } = note;
        const noteDate = new Date(noteCreatingDetails.year, noteCreatingDetails.month, noteCreatingDetails.date).toLocaleString();
        if (inputDate === noteDate) {
            return (
                <li key={id} className={style.notes__item}>
                    <h5>{note.noteTitle}</h5>
                    <p>{note.noteText}</p>
                    <span>{note.noteDate}</span>
                </li>
            )
        } else {
            return null
        }

    })

    return (
        <div className={isOpened ? style.note__wrap + ' ' + style.note__opened : style.note__wrap}>
            <div className={style.note__title}>
                <h4>{dayInWeek}</h4>
                <h4>{dateNum} {monthName} {year}</h4>
            </div>
            <hr />
            <div className={style.note__details}>
                <div className={style.notes__list__wrapper}>
                    <p>Your notes</p>
                    <ul className={style.notes__list}>
                        {notesList}
                    </ul>
                </div>
                <div className={style.addBtn__wrapper}>
                    <form onSubmit={onSubmitForm} action="" className={style.createNote__form}>
                        {
                            isOpenForm ? <div className={style.createInput__wrap}>
                                <input onChange={e => setTitle(e.currentTarget.value)} type="text" placeholder="add your title" />
                                <textarea onChange={e => setNoteText(e.currentTarget.value)} name="" id="note__text" placeholder="add your text"></textarea>
                            </div> : null
                        }
                        {
                            isOpenForm ? <button className={style.addNote__bth}><span>submit</span></button> : null
                        }
                    </form>
                    {
                        !isOpenForm ? <button type="button" onClick={openNoteForm} className={style.addNote__bth}><span>+ add</span></button> : null
                    }
                </div>
            </div>
            <button onClick={closingNote} className={style.close__btn}>Close</button>
        </div>
    )
}

export default CallendarNotes;