import Page from "../components/Page";
import { iconExists, loadIcons, Icon } from "@iconify/react";

//-----------------------------------------
const icon = "emojione:locked-with-pen";
const Test = () => {
  loadIcons([icon]);
  return <Page title="TEST">{iconExists(icon) && <Icon icon={icon} />}</Page>;
};

export default Test;
