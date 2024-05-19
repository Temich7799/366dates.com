export default function getMonthName(month: number) {
    const monthNamesInGerman = [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];

    return monthNamesInGerman[month - 1];
}