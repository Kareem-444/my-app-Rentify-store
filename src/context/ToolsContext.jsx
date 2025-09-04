import React, { createContext } from "react";

export const ToolsContext = createContext();

const toolsData = [
  {
    id: 1,
    title: "Hammer",
    description: "$5/day - A reliable hammer for all your DIY needs.",
    image: "https://img.icons8.com/color/96/hammer.png",
    category: "Hand",
    price: "low",
  },
  {
    id: 2,
    title: "Drill",
    description: "$15/day - Powerful drill for tough jobs.",
    image: "https://img.icons8.com/color/96/drill.png",
    category: "Power",
    price: "mid",
  },
  {
    id: 3,
    title: "Saw",
    description: "$12/day - Sharp saw for clean cuts.",
    image: "https://img.icons8.com/color/96/saw.png",
    category: "Hand",
    price: "mid",
  },
  {
    id: 4,
    title: "Wrench",
    description: "$35/day - Heavy-duty wrench for big projects.",
    image: "https://img.icons8.com/color/96/wrench.png",
    category: "Power",
    price: "high",
  },
];

export const ToolsProvider = ({ children }) => (
  <ToolsContext.Provider value={{ tools: toolsData }}>
    {children}
  </ToolsContext.Provider>
);

export default ToolsProvider;