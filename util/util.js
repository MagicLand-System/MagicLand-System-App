export function truncateString(str, maxLength) {
    if (str?.length <= maxLength) {
        return str;
    } else {
        return str?.slice(0, maxLength - 3) + "...";
    }
}

export const formatPrice = (price) => {
    const numberString = String(price);
    const numberArray = numberString.split('');
    const dotPosition = numberArray.length % 3 || 3;
    for (let i = dotPosition; i < numberArray.length; i += 4) {
        numberArray.splice(i, 0, '.');
    }
    const formattedNumber = numberArray.join('');
    return formattedNumber;
}

export function getIndexById(array, id) {
    return array.findIndex(obj => obj.id === id);
}
