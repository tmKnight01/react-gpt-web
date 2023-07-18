import { atom } from "recoil";


const collapsed = atom({
    key: "collapsed",
    default: true
});

export default collapsed;