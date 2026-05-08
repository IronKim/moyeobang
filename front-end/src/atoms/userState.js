import {atom} from "recoil";
import {ROLETYPE} from "../constants/ROLETYPE";

export const userState = atom({
    key: 'userState',
    default: {
        token: '',
        accountId: '',
        roles: [ROLETYPE.USER],
        roleType: ROLETYPE.USER,
    }
});