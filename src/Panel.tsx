import React from "react";
import { useAddonState, useChannel,useArgs} from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [args, updateArgs, resetArgs] = useArgs();
  console.log('args: ', args);
  console.log('props: ', props);
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    danger: [],
    warning: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

  return (
    <AddonPanel {...props}>
      123
    </AddonPanel>
  );
};
