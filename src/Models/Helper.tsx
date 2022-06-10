export function getRandomValueBetween(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

export function getRandomElement(arr: Array<any>) {
    var l = arr.length - 1;
    return arr[Math.round(Math.random() * l)];
}

export function removeElement(arr: Array<any>, ele: any) {
    return arr.filter((v) => v !== ele);
}

export default function Helper() {
    return;
}
