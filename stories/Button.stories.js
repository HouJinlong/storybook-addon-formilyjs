import React from "react";
import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    myAddonParameter: `
<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
  <SomeOtherComponent funcProp={(a) => a.id} />
</MyComponent>
`,
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.parameters = {
  lowcode_schema: {
    'id':'6412c0a2f1e1dd6483cc6f47',
    "props": {
      "type": "object",
      "properties": {
        "label": {
          "title": "最简",
          "type": "string"
        },
        'size': {
          title:'单选-按钮',
          type: 'string',
          'x-component': 'Radio.Group',
          'x-component-props':{
            'optionType':'button',
          },
          enum:["small", "medium", "large"].map(v=>{
            return {
              label: v,
              value:v
            }
          })
        },
        'string-css-image': {
          type: 'string',
          title:'css图片',
          'x-component': 'CssImageSetter',
        },
      }
    },
    "default": {
      "label": "1223"
    }
  },
}
export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
