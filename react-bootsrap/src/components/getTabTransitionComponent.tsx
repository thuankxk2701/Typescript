import { TransitionComponent } from "@restart/ui/types";
import Fade from "./Fade";
import { TransitionType } from "./helpers";

function getTabTransitionComponent(transition?: TransitionType): TransitionComponent | undefined {
  if (typeof transition === "boolean") {
    return transition ? Fade : undefined;
  }
  return transition;
}

export default getTabTransitionComponent;
