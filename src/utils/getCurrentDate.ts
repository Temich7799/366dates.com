export default function getCurrentDate() {

    const date = new Date();

    return { currentDay: date.getDate(), currentMonthIndex: date.getMonth() + 1 }
}