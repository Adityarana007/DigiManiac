import { Dimensions } from "react-native";

export const actualdeviceSize = Dimensions.get('window');

export function getHitSlop() {
    return { top: 30, bottom: 30, left: 30, right: 30 };
  }