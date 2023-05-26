import reactIcon from "./react.svg";
import vueIcon from "./vue.svg";
import flutterIcon from "./flutter.svg";
import blockIcon from "./block.svg";

export function getIcon(keywords = []) {
  if (!keywords) return null;
  if (keywords.includes("vue")) {
    return vueIcon;
  } else if (keywords.includes("flutter")) {
    return flutterIcon;
  } else if (keywords.includes("react")) {
    return reactIcon;
  } else {
    return blockIcon;
  }
}
