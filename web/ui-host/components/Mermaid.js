import { useState } from "react";

import useLayoutEffect from "../services/isomorphic-effect.service";
import { v4 as uuidv4 } from "uuid";

const uuid = () => `mermaid-${uuidv4().toString()}`;

export default function Mermaid({ graphDefinition }) {
  const [html, setHtml] = useState("");
  useLayoutEffect(() => {
    if (graphDefinition) {
      try {
        window.mermaid.mermaidAPI.render(uuid(), graphDefinition, (svgCode) =>
          setHtml(svgCode)
        );
      } catch (e) {
        setHtml("");
        console.error(e);
      }
    }
  }, [graphDefinition]);

  return graphDefinition ? (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : null;
}
