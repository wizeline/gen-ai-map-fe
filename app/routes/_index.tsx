import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { Breadcrumb } from "~/components/breadcrumb/Breadcrumb";
import BubbleChart from "~/components/charts/BubbleChart";
//import SunburstChart from "~/components/charts/SunburstChart";
import HeaderIcon from "~/components/icons/HeaderIcon";
import { Loader } from "~/components/loader/Loader";
import { TopNavigation } from "~/components/navigation/TopNavigation";
import { NotificationType } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Wizeline Gen AI Map" },
    {
      name: "Wizeline Gen AI Map page",
      content: "Welcome to Wizeline Gen AI Map",
    },
  ];
};

export default function Index() {
  const [jsonData, setJsonData] = useState(null);
  const [jsonModalData, setJsonModalData] = useState(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const newNotifications =
    notifications.length > 0 &&
    notifications.some((notification) => {
      const notificationDate = new Date(notification?.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return notificationDate >= today;
    });
  const [nodeAncestors, setNodeAncestors] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://gen-ai-tools-public.s3.amazonaws.com/map-tree.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data));
  }, []);

  useEffect(() => {
    fetch("https://gen-ai-tools-public.s3.amazonaws.com/gen-ai-map.json")
      .then((response) => response.json())
      .then((data) => setJsonModalData(data));
  }, []);

  useEffect(() => {
    // TODO: Fetch notifications from the API ?
    setNotifications([
      {
        id: 1,
        description: "ClickUp now is included as an AI Coding Tool",
        date: "2025-03-23T00:00:00.000Z",
      },
      {
        id: 2,
        description: "Jasper has been moved as an AI Tool for Content Creation",
        date: "2024-03-20T00:00:00.000Z",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <div className="absolute left-0 top-0 sm:ml-auto sm:mr-auto sm:left-0 sm:right-0">
        <HeaderIcon className="ml-4 mt-4" />
      </div>
      <div className="hidden sm:block absolute right-0 top-0 mt-4 mr-4">
        <TopNavigation
          newNotifications={newNotifications}
          notifications={notifications}
        />
      </div>
      {/*!jsonData ? <Loader /> : <div className="min-h-screen flex flex-col justify-between items-center"><SunburstChart data={jsonData} onSelectNode={setNodeAncestors} /></div>*/}
      {!jsonData ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex flex-col justify-between items-center">
          <BubbleChart
            data={jsonData}
            modalData={jsonModalData}
            onSelectNode={setNodeAncestors}
          />
        </div>
      )}
      <div className="hidden sm:block absolute bottom-0 left-0 mb-4 ml-4">
        <Breadcrumb path={nodeAncestors} />
      </div>
    </div>
  );
}
