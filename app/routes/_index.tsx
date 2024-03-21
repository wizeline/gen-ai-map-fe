import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import HeaderMinimalist from "~/components/header/HeaderMinimalist";
import SunburstChart from "~/components/sunburstChart/SunburstChart";

export const meta: MetaFunction = () => {
  return [
    { title: "Wizeline Gen AI Map" },
    { name: "Wizeline Gen AI Map page", content: "Welcome to Wizeline Gen AI Map" },
  ];
};

export default function Index() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetch('https://gen-ai-tools-public.s3.amazonaws.com/map-tree.json')
        .then(response => response.json())
        .then(data => setJsonData(data));
  }, [])
  
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <HeaderMinimalist />
      {jsonData && <SunburstChart data={jsonData} />}
    </div>
  );
}
