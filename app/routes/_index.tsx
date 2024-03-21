import type { MetaFunction } from "@remix-run/node";
import HeaderMinimalist from "~/components/header/HeaderMinimalist";

export const meta: MetaFunction = () => {
  return [
    { title: "Wizeline Gen AI Map" },
    { name: "Wizeline Gen AI Map page", content: "Welcome to Wizeline Gen AI Map" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <HeaderMinimalist />
      <div id="chart-map" className="mb-6"></div>
    </div>
  );
}
