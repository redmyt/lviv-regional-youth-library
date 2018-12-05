const DATE_TIME_REGEXP = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/,
    DATE_REGEXP = /\d{4}-\d{2}-\d{2}/;
export const LANGUAGE_CODES = {
    'uk': 1,
    'en': 2
};

export const getDeepObjectCopy = obj => JSON.parse(JSON.stringify(obj));

export const getUpdatedState = (changesObj, state) => {
    const oldState = getDeepObjectCopy(state);
    return Object.assign(oldState, changesObj);
};

export const formatDateToView = rawDate => {
    return rawDate ? (new Date(rawDate)).toUTCString() : '-';
};

export const formatDateToPicker = rawDate => {
    let date = '-';
    if (rawDate) {
        date = rawDate.match(DATE_TIME_REGEXP) || rawDate.match(DATE_REGEXP);
    }
    return date;
};

export const getItemById = (itemId, collection) => {
    for (let item of collection) {
        if (item.id === itemId) {
            return item;
        }
    }
};

export const splitTextToParagraphs = text => text ? text.split('\n') : [];

export const removeBase64Prefix = dataUrlContent => dataUrlContent ? dataUrlContent.split(',').pop() : '';

export const parseImagePath = path => {
    let parsedPath = '';
    if (path) {
        const staticIndex = path.indexOf('/static/');
        parsedPath = staticIndex !== -1 ? path.slice(staticIndex) : path;
    }
    return parsedPath;
};

export const convertDateTimetoDateFormat = dateTime => {
    return dateTime ? dateTime.split('T')[0] : '-';
};
