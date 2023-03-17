import React, { useEffect, useRef, useState } from "react";
import {
  useAddonState,
  useChannel,
  useArgs,
  useParameter,
} from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, ParameterName } from "./constants";
import { Empty } from "antd";
// import { PanelContent } from "./components/PanelContent";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [args, updateArgs, resetArgs] = useArgs();
  const updateArgsRef = useRef(null);
  updateArgsRef.current = updateArgs;
  const iframe = useRef(null);
  const [postMessage, setPostMessage] = useState<any>();
  useEffect(() => {
    const fn = (event: MessageEvent<any>) => {
      if (event.data.source === "storybook/my-formilyjs-iframe") {
        const temp: any = {
          change_data: (data) => {
            updateArgsRef.current(data);
          },
        }[event.data.type];
        if (temp) {
          console.log("[formilyjs-iframe] --> [formilyjs]", event.data);
          temp(event.data.data);
        }
      }
    };
    if (iframe.current) {
      const iframeEl = iframe.current;
      iframeEl.onload = () => {
        setPostMessage(() => (data) => {
          iframeEl.contentWindow?.postMessage(
            data,
            new URL(iframeEl.src).origin
          );
        });
      };
      window.addEventListener("message", fn, false);
      return () => {
        window.removeEventListener("message", fn, false);
      };
    }
  }, [iframe.current]);

  const lowcode_schema = useParameter<any>(ParameterName);
  useEffect(() => {
    if (postMessage) {
      postMessage({
        source: ADDON_ID,
        type: "init",
        data: lowcode_schema,
      });
    }
  }, [postMessage, lowcode_schema]);

  return (
    <AddonPanel {...props}>
      {lowcode_schema?.iframe && (
        <iframe
          ref={iframe}
          src={lowcode_schema.iframe}
          frameBorder="0"
          style={{
            width: "100%",
            height: "100%",
          }}
          title="storybook-addon-formilyjs-iframe"
        ></iframe>
      )}
    </AddonPanel>
  );
};
