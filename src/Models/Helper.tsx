// returns between min and max, max is include. (1-2 returns 1 or 2)
export function getRandomValueBetween(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

// 3 will return 0, 1, 2 or 3 as a result.
export function getRandomValueUpTo(max: number) {
    return Math.floor(Math.random() * (max + 1));
}

export function getRandomElement<T>(arr: Array<T>): T {
    var l = arr.length - 1;
    return arr[Math.round(Math.random() * l)];
}

export function removeElement(arr: Array<any>, ele: any) {
    return arr.filter((v) => v !== ele);
}

export const G_MONTHS_ARR = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function getPaddedToTwoDigits(x: number): string {
    if (x < 10) {
        return '0' + x;
    }

    return x + '';
}

export function getPaddedToThreeDigits(x: number): string {
    if (x < 10) {
        return '00' + x;
    }

    if (x < 100) {
        return '0' + x;
    }

    return x + '';
}
