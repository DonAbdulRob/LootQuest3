export function getRandomValueBetween(min: number, max: number) {
    return Math.round(Math.random() * ((max - min)) + min);
}

export function getRandomElement(arr: Array<any>) {
    var l = arr.length;
    return arr[Math.round(Math.random() * ((l - 0)))];
}


export default function Helper() {
    return;
}