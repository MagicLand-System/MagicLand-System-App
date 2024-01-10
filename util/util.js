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

export const formatDate = (date) => {
    const startDateString = date;
    const startDate = new Date(startDateString);

    const day = startDate.getDate().toString().padStart(2, '0');
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const year = startDate.getFullYear();

    const formattedStartDate = `${day}/${month}/${year}`;
    return formattedStartDate;
}

export const formatTime = (date) => {
    const startDateString = date;
    const startDate = new Date(startDateString);

    const hours = startDate.getHours().toString().padStart(2, '0');
    const minutes = startDate.getMinutes().toString().padStart(2, '0');

    const formattedStartTime = `${hours}:${minutes}`;
    return formattedStartTime;
}

export function getIndexById(array, id) {
    return array.findIndex(obj => obj.id === id);
}

export function getMinMaxPrice(courses) {
    if (!courses || courses.length === 0) {
        return { minPrice: undefined, maxPrice: undefined };
    }

    let minPrice = courses[0].price;
    let maxPrice = courses[0].price;

    for (let i = 1; i < courses.length; i++) {
        const currentPrice = courses[i].price;
        if (currentPrice < minPrice) {
            minPrice = currentPrice;
        }
        if (currentPrice > maxPrice) {
            maxPrice = currentPrice;
        }
    }

    return { minPrice, maxPrice };
}
