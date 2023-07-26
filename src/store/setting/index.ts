
import { darkTheme, lightTheme } from './style'
import getLocalSetting from './localSetting';
import { theme } from 'antd'
import { atom, selector } from 'recoil';



const setting = atom({
    key: 'setting',
    default: getLocalSetting()
})



const themeMap = selector({
    key: 'themeMap',
    get: ({ get }) => {
        return {
            'light': lightTheme,
            'drak': darkTheme,
            antdTheme: get(setting).Theme === 'drak' ? theme.darkAlgorithm : theme.defaultAlgorithm
        }
    }
})

export { setting, themeMap };