export const getUpdatedState = (changesObj, state) => {
    const oldState = JSON.parse(JSON.stringify(state));
    return Object.assign(oldState, changesObj);
};
