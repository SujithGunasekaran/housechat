import moment from 'moment';

export const formatDate = (date) => {
    return moment.unix(date / 1000).format('DD/MM/YYYY');
}

export const fromNow = (date) => {
    return moment.unix(date / 1000).fromNow();
}

export const sortingText = (text) => {
    let maxLength = 200;
    if (!text) return '';
    if (text <= maxLength) return text;
    return `${text.substr(0, maxLength)}.....`;
}