import React, { FC } from 'react';
import { monthNames } from '../../defaultData/defConfig';
import { yearsNum } from '../../defaultData/defConfig';
import prev from '../../assets/img/prev.svg';
import next from '../../assets/img/next.svg';
import style from './CallendarParams.module.css';

interface CallendarParamsProps {
    nextMonth: () => void
    prevMonth: () => void
    setMonth: (month: number) => void
    setYear:(year: number) => void
    month: number
    year: number
}

const CallendarParams: FC<CallendarParamsProps> = ({ setYear, setMonth, month, year, prevMonth, nextMonth }) => {

    const changeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(+e.currentTarget.value)
    }
    const changeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(+e.currentTarget.value)
    }

    return (
        <div className={style.params__wrapper}>
            <button className={style.params__btn+' '+style.prev__btn} onClick={prevMonth}>
                {/* <img src={prev} alt="prev"/> */}
                {"<"}
            </button>
            <div className={style.parameters}>
                <select value={month} onChange={(e) => changeMonth(e)} name="month" id="month">
                    {monthNames.map((monthName, id) => {
                        return (
                            <option key={id} value={id}>{monthName}</option>
                        )
                    })}
                </select>
                <select value={year} onChange={(e) => changeYear(e)} name="years" id="years">
                    {
                        yearsNum.map(yearNumber => {
                            return (
                                <option key={yearNumber} value={yearNumber}>{yearNumber}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button className={style.params__btn+' '+style.next__btn} onClick={nextMonth}>
                {/* <img src={next} alt="next"/> */}
                {">"}
            </button>
        </div>
    )
}

export default CallendarParams;