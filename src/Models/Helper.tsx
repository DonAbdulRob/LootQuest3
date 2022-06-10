export function getRandomValueBetween(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

// 3 will return 0-2 as results.
export function getRandomValueUpTo(max: number) {
    return Math.floor(Math.random() * (max + 1));
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
