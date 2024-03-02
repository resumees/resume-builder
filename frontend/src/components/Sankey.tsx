import { ResponsiveSankey } from "@nivo/sankey";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface SankeyData {
  nodes: {
    id: string;
    nodeColor: string;
  }[];
  links: {
    source: string;
    target: string;
    value: number;
  }[];
}

interface FinanceInput {
  id: string;
  category: string;
  amount: number;
  frequency: number;
}

const Sankey: React.FC = () => {
  const { income, expenses, totalIncome, totalExpense } = useSelector((state: RootState) => state.global.financials);

  // Function used to transform the data from the redux store into the format required by the Sankey component
  const transformData = () => {
    const nodes = [
      ...income.map((item: FinanceInput) => ({ id: item.category, nodeColor: "hsl(195, 70%, 50%)" })),
      ...expenses.map((item: FinanceInput) => ({ id: item.category, nodeColor: "hsl(195, 70%, 50%)" })),
      { id: "Income", nodeColor: "hsl(195, 70%, 50%)" },
      { id: "Expense", nodeColor: "hsl(195, 70%, 50%)" },
      { id: ".", nodeColor: "hsl(195, 70%, 50%)" },
    ];

    const links = [
      ...income.map((item: FinanceInput) => ({ source: item.category, target: "Income", value: item.amount*item.frequency })),
      ...expenses.map((item: FinanceInput) => ({ source: "Expense", target: item.category, value: item.amount*item.frequency })),
      { source: "Income", target: ".", value: totalIncome },
      { source: ".", target: "Expense", value: totalExpense },
    ];
    return { nodes, links };
  };

  const [sankeyData, setSankeyData] = useState<SankeyData>(transformData());

  useEffect(() => {
    setSankeyData(transformData());
  }, [income, expenses])

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <ResponsiveSankey
      data={sankeyData}
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
    />
    </div>
  );
};

export default Sankey;
