const DATE_REGEXP = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

export const getUpdatedState = (changesObj, state) => {
    const oldState = JSON.parse(JSON.stringify(state));
    return Object.assign(oldState, changesObj);
};

export const formatDateToView = rawDate => {
    return rawDate ? (new Date(rawDate)).toUTCString() : '-';
};

export const formatDateToPicker = rawDate => {
    let date = '-';
    if (rawDate) {
        date = rawDate.match(DATE_REGEXP);
    }
    return date;
};

export const getItemById = (itemId, collection) => {
    for (let item of collection) {
        if (item.id === itemId) {
            return item;
        }
    }
}

export const splitTextToParagraphs = text => text.split('\n');

export const removeBase64Prefix = dataUrlContent => dataUrlContent.split(',').pop();
