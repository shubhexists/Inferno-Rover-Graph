import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

export default function App() {
  const [data, setData] = useState([
    { x: 28.632430, y: 77.218790 },
    { x: 28.632430, y: 77.218790 },
  ]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = [...data];
      newData[1].x += Math.random() < 0.5 ? -0.00001 : 0.00001;
      newData[1].y += Math.random() < 0.5 ? -0.00001 : 0.00001;
      setData(newData);
      console.log(newData);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <ScatterChart
      width={1900}
      height={940}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
      }}
    >
      <XAxis type="number" dataKey="x" name="Lattitude" domain={[data[0].x - 0.0001, data[0].x + 0.0001]} />
      <YAxis type="number" dataKey="y" name="Longitude" domain={[data[0].y - 0.0001,data[0].y + 0.0001]}/>
      <Tooltip cursor={{ strokeDasharray: "2 2" }} />
      <Scatter name="A school" data={data} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Scatter>
      <Tooltip cursor={{ strokeDasharray: "2 2" }} />
      <ReferenceLine y={77.218790} stroke="#000000" />
      <ReferenceLine x={28.632430} stroke="#000000" />
    </ScatterChart>
  );
}
