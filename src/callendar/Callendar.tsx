import React, { FC, useState, useEffect } from 'react';

import CallendarColumn from './CallendarColumn/CallendarColumn';
import { daysArr, defNotes } from '../defaultData/defConfig';
import CallendarParams from './CallendarParams/CallendarParams';
import CallendarNotes from './CallendarNotes/CallendarNotes';

import style from './Callendar.module.css';


interface CallendarProps {
    month: number
    year: number
}

export interface DaysStateData {
    dateValue: number
    dayNum: number
}

export interface NoteDetailsInfo {
    date: number,
    day: number
    year: number
    month: number
    time: string
}

export interface NoteInterface {
    id: number | null
    noteTitle: string 
    noteText: string | null
    noteDate: string | null
    noteCreatingDetails: NoteDetailsInfo
}

const Callendar = () => {
    const date = new Date();
    const DAYS__IN__WEEK = 7;
    const today = date.getDate();
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const [dayInfo, setDayInfo] = useState<DaysStateData[] | []>([])
    const [weekDays, setWeekDays] = useState<any>([])
    const [noteIsOpened, setNoteIsOpened] = useState(false);
    const [selectedDate, setSelectedDate] = useState<number>(today)
    const [notes, setNotes] = useState<NoteInterface[] | []>(defNotes);

    const getDaysInMonth = (month: number, year: number): number => {
        const dateOn = new Date(year, month, 1);
        // setDayInfo([])
        let days = [];
        while (dateOn.getMonth() === month) {
            let dateValue: number = new Date(dateOn).getDate();
            let dayNum: number = new Date(dateOn).getDay()
            if (dayNum === 0) dayNum = 7
            days.push({ dateValue, dayNum });
            dateOn.setDate(dateOn.getDate() + 1);
        }
        // console.log(days.length + " - Days in month")
        return days.length
    }

    useEffect(() => {
        // console.log(notes)
    }, [notes])

    useEffect(() => {
        // setSelectedDate(today)
        setMonth(date.getMonth())
        setYear(date.getFullYear())
    }, [])

    useEffect(() => {
        // getDaysInMonth(month, year)
        getWeeksDatePortion(month, year);
    }, [month, year, notes])

    const daysWeek = daysArr.map((day, id) => {
        return (
            <li key={id} className={style.daysWeek}>
                <div className={style.daysWeek__item}>
                    <p>{day.day}</p>
                </div>
            </li>
        )
    })

    const getStartDay = (date:any) => {
        const dayOfWeek = date.getDay()
        if(dayOfWeek === 0) return 6
        return dayOfWeek - 1
    }

    const getWeeksDatePortion = (month: number, year: number) => {
        let weeksDateArr: any = [];
        const inputDate = new Date(year, month)
        const daysInMonth = getDaysInMonth(month, year);
        const startDayInMonth = getStartDay(inputDate);
        // console.log('-------------------------------------------')
        // console.log(daysInMonth + " - days in month")
        // console.log(startDayInMonth + " - start day in month")
        // console.log('-------------------------------------------')
        // console.log(new Date(year, month).toLocaleString())
        const monthDaysOff = Math.ceil((daysInMonth + startDayInMonth) / DAYS__IN__WEEK);
        let day = 1

        for (let i: number = 0; i < monthDaysOff; i++) {
            weeksDateArr[i] = []
            for (let k: number = 0; k < DAYS__IN__WEEK; k++) {
                if ((i === 0 && k < startDayInMonth) || day > daysInMonth) {
                    weeksDateArr[i][k] = undefined
                } else {
                    weeksDateArr[i][k] = new Date(year, month, day++).getDate()
                }
            }
        }

        setWeekDays(weeksDateArr);

    }

    const weekRender = weekDays.map((week: number[], id: number) => {
        return (
            <CallendarColumn notes={notes} month={month} year={year} setSelectedDate={(date) => setSelectedDate(date)} noteIsOpened={noteIsOpened} openNote={()=>setNoteIsOpened(true)} today={today} key={id} week={week} />
        )
    })

    const nextMonth = () => {
        if (month + 1 > 11) {
            setMonth(0)
            setYear(year + 1);
        } else {
            setMonth(month + 1)
        }
    }

    const prevMonth = () => {
        if (month - 1 < 0) {
            setMonth(11)
            setYear(year - 1)
        } else {
            setMonth(month - 1)
        }
    }

    const setNotesList = (note:NoteInterface) => {
        setNotes([...notes, note])
    }

    return (
        <div className={style.callendar__wrapper}>
            <div className={style.callendar}>
                <h2>Calendar</h2>
                <div className='flex justify-center'>
                    <CallendarParams setYear={(year) => setYear(year)} setMonth={(month) => setMonth(month)} year={year} month={month} nextMonth={nextMonth} prevMonth={prevMonth} />
                </div>
                <ul className={style.daysWeek__list}>
                    {daysWeek}
                </ul>
                <ul className={style.daysList}>
                    {weekRender}
                </ul>
            </div>
            <CallendarNotes setNotes={setNotesList} notes={notes} closeNote={() => setNoteIsOpened(false)} year={year} month={month} selectedDate={selectedDate} isOpened={noteIsOpened} />
        </div>
    )
}

export default Callendar;