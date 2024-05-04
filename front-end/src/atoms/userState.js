import {atom} from "recoil";
import {ROLETYPE} from "../constants/ROLETYPE";

export const userState = atom({
    key: 'userState',
    default: {
        token: '',
        accountId: '',
        roleType: ROLETYPE.USER,
    }
});