import { ResponsiveSankey } from "@nivo/sankey";
import React from "react";

const data = {
  nodes: [
    {
      id: "John",
      nodeColor: "hsl(195, 70%, 50%)",
    },
    {
      id: "Raoul",
      nodeColor: "hsl(244, 70%, 50%)",
    },
    {
      id: "Jane",
      nodeColor: "hsl(148, 70%, 50%)",
    },
    {
      id: "Marcel",
      nodeColor: "hsl(162, 70%, 50%)",
    },
    {
      id: "Ibrahim",
      nodeColor: "hsl(351, 70%, 50%)",
    },
    {
      id: "Junko",
      nodeColor: "hsl(244, 70%, 50%)",
    },
  ],
  links: [
    {
      source: "Ibrahim",
      target: "John",
      value: 17,
    },
    {
      source: "John",
      target: "Marcel",
      value: 143,
    },
    {
      source: "John",
      target: "Raoul",
      value: 190,
    },
    {
      source: "Junko",
      target: "John",
      value: 89,
    },
    {
      source: "Raoul",
      target: "Jane",
      value: 44,
    },
    {
      source: "Marcel",
      target: "Raoul",
      value: 130,
    },
  ],
};

const Sankey: React.FC = () => (
  <div style={{ height: "500px", width: '100%' }}>
    <ResponsiveSankey
      data={data}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      align="justify"
      colors={{ scheme: "category10" }}
      nodeOpacity={1}
      nodeThickness={18}
      nodeInnerPadding={3}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      enableLinkGradient={true}
      enableLabels={true}
      labelPosition="outside"
      labelOrientation="vertical"
      labelPadding={16}
      labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 130,
          itemWidth: 100,
          itemHeight: 14,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 14,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default Sankey;
