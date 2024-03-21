import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/footer/Footer";
import Header from "~/components/header/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Wizeline Gen AI Map" },
    { name: "Wizeline Gen AI Map page", content: "Welcome to Wizeline Gen AI Map" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div id="chart-map border border-wizeline-base"></div>
      </div>
      <Footer />
    </div>
  );
}
