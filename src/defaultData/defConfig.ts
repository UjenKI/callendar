export const daysArr = [
    { day: 'Mon', DayNum: 1 },
    { day: 'Tue', DayNum: 2 },
    { day: 'Wed', DayNum: 3 },
    { day: 'Thu', DayNum: 4 },
    { day: 'Fri', DayNum: 5 },
    { day: 'Sat', DayNum: 6 },
    { day: 'Sun', DayNum: 7 },
]

export const defNotes = [
    {
        id: 1,
        noteTitle: 'work',
        noteText: 'make a commit for my project',
        noteDate: '05.12.2022',
        noteCreatingDetails: {
            date: 5,
            day: 0,
            year: 2022,
            month: 11,
            time: '10:35'
        }
    },
    {
        id: 2,
        noteTitle: 'samyrai',
        noteText: 'take cookie from localStorage',
        noteDate: '06.12.2022',
        noteCreatingDetails: {
            date: 6,
            day: 1,
            year: 2022,
            month: 11,
            time: '12:35'
        }
    }
]

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const monthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export let yearsNum: number[] = []

const yearNow = new Date().getFullYear();
const yearRangeStart = yearNow - 20;
const getYearsRange = (year:number) => {
    for (let i: number = yearRangeStart; i < year + 20; i++) {
        yearsNum.push(i)
    }
    return yearsNum
}
getYearsRange(yearNow);