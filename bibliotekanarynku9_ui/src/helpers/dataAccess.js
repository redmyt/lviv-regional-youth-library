export const reduceTranslationsCollection = item => {
    let result = {};
    for (let transl of item.translations) {
        result = {...result, ...transl, translationId: transl.id};
    }
    return result;
};

export const parseManageItem = item => {
    let parsedItem = {...item};
    parsedItem = {...parsedItem, ...reduceTranslationsCollection(parsedItem)};
    return parsedItem;
};
