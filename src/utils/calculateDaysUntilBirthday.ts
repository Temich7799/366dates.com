export default function calculateDaysUntilBirthday(birthday: string, currentMonth: number = new Date().getMonth() + 1) {
    const today = new Date();
    const [day, month] = birthday.split('/').map(Number);
    let nextBirthdayYear = today.getFullYear();
    if (month < currentMonth || (month === currentMonth && day < today.getDate())) {
        nextBirthdayYear++;
    }
    const nextBirthday = new Date(nextBirthdayYear, month - 1, day);
    const diff = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
