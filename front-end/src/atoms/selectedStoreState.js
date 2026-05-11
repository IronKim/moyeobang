import {atom} from "recoil";

const STORAGE_KEY = 'moyeobangLastSelectedStoreId';

const localStorageEffect = ({ onSet, setSelf }) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
        setSelf(JSON.parse(saved));
    }

    onSet((newValue, _, isReset) => {
        if (isReset || newValue === null) {
            localStorage.removeItem(STORAGE_KEY);
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
        }
    });
};

export const selectedStoreState = atom({
    key: 'selectedStoreState',
    default: null,
    effects: [localStorageEffect],
});
