import { addons, types } from "@storybook/addons";

import { ADDON_ID,  PANEL_ID,ParameterName} from "../constants";
import { Panel } from "../Panel";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Controls",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });
});
