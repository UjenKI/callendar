import React, { FC, useState } from 'react';

import { DaysStateData, NoteInterface } from '../Callendar';
import { defNotes } from '../../defaultData/defConfig';
import NotesMark from './NotesMark/NotesMark';

import style from './CallendarColumn.module.css';


interface CallendarColumnProps {
    week: number[]
    today: number
    openNote: () => void
    noteIsOpened: boolean
    setSelectedDate: (dayNum: number) => void
    year: number
    month: number
    children?: React.ReactNode;
    notes:NoteInterface[]

}
const CallendarColumn: FC<CallendarColumnProps> = ({ notes,month, year, setSelectedDate, noteIsOpened, openNote, today, week }): JSX.Element => {

    // const [isToday, setIsToday] = useState(false)

    // const checkIsToday = (month: number, year:number, day:number) => {
    //     const todayIs = new Date()
    //     const inputDate = new Date(year, month, day);
    //     (todayIs.toDateString() == inputDate.toDateString()) ? setIsToday(true) : setIsToday(false)
    // }

    const selectDate = (dayNum: number) => {
        openNote()
        setSelectedDate(dayNum)
    }

    // const notes = (day:number, year:number, month: number) => {
    //     notesList.map((note, id) => {
    //         const {noteCreatingDetails} = note
    //         const inputDate = new Date(year, month, day).toLocaleString();
    //         const noteDate = new Date(noteCreatingDetails.year, noteCreatingDetails.month, noteCreatingDetails.date).toLocaleString();

    //         if( inputDate === noteDate) {
    //             return (
    //                 <div key={id} className={style.notes}>
    //                     <p>{note.noteTitle}</p>
    //                 </div>
    //             )
    //         } else {
    //             return null
    //         }
    //     })
    // }



    return (
        <li className={style.dayItem} >
            {week.map((day, id) => {
                return (
                    <div onClick={() => selectDate(day)} key={id} className={new Date().toDateString() == new Date(year, month, day).toDateString() ? style.day__wrap + ' ' + style.today : style.day__wrap}>
                        <div className={style.day}>
                            <p>{day}</p>
                        </div>
                        <NotesMark dayIn={day} yearIn={year} monthIn={month} notes={notes} />
                    </div>
                )
            })}
        </li>
    )
}

export default CallendarColumn;