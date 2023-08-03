import { Setting, LOCAL_SETTING } from "@/store/setting/localSetting";
import { ls } from "@/utils/strage";
import { useRecoilState } from "recoil";
import { setting } from "@/store/setting/index";
import { cloneDeep } from "lodash";

const useSetting = () => {
  const [soureSetting, setSourceSetting] = useRecoilState(setting);

  function setSetting(setting: Partial<Setting>) {
    const newSettingValue = { ...cloneDeep(soureSetting), ...setting };

    setSourceSetting(newSettingValue);
    setSettingStorage(newSettingValue);
  }

  function setSettingStorage(setting: Setting) {
    ls.set(LOCAL_SETTING, setting);
  }

  return {
    setSetting,
    soureSetting
  };
};

export default useSetting;
