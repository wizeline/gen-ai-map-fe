/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MetaFunction } from "@remix-run/node";
import { useContext, useEffect, useState } from "react";
import { Breadcrumb } from "~/components/breadcrumb/Breadcrumb";
import BubbleChart from "~/components/charts/BubbleChart";
//import SunburstChart from "~/components/charts/SunburstChart";
import HeaderIcon from "~/components/icons/HeaderIcon";
import ModalInformation from "~/components/information/ModalInformation";
import { Loader } from "~/components/loader/Loader";
import { TopNavigation } from "~/components/navigation/TopNavigation";
import ViewSwitcher, { ViewType } from "~/components/navigation/ViewSwitcher";
import AIProductTable from "~/components/tables/AIProductTable";
import { ZoomControl } from "~/components/zoom/ZoomControl";
import { ModalContext } from "~/context/ModalContext";
import { useScreenSize } from "~/context/ScreenSizeContext";
import { NotificationType } from "~/types";
import { zoomFeatureFlag } from "~/utils/featureFlags";

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
  const { isModalOpen, openModal, closeModal } = useContext(ModalContext);
  const [jsonData, setJsonData] = useState(null);
  const [jsonModalData, setJsonModalData] = useState(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [nodeAncestors, setNodeAncestors] = useState<string[]>([]);
  const [zoomPercentage, setZoomPercentage] = useState(100);
  const [productName, setProductName] = useState("");
  const { isDesktop } = useScreenSize();

  const handleIsInfoModalClose = () => {
    setProductName("");
    closeModal();
  };

  useEffect(() => {
    if (productName.length > 0) {
      openModal();
    }
  }, [openModal, productName]);

  const handleZoomChange = (newZoomPercentage: number) => {
    setZoomPercentage(newZoomPercentage);
  };

  const newNotifications =
    notifications.length > 0 &&
    notifications.some((notification) => {
      const notificationDate = new Date(notification?.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return notificationDate >= today;
    });
  const [currentView, setCurrentView] = useState<ViewType>(
    ViewType.BubbleChart
  );

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

  const handleOnSwitch = (view: ViewType) => {
    setCurrentView(view);
    setProductName("");
    closeModal();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between relative">
        <div className="absolute left-0 top-0 sm:ml-auto sm:mr-auto sm:left-0 sm:right-0">
          <HeaderIcon className="ml-4 mt-4" />
        </div>
        <div className="hidden sm:block absolute right-0 top-0 mt-4 mr-4 z-40">
          <ViewSwitcher onSwitch={handleOnSwitch} />
        </div>
        <div className="hidden sm:block absolute right-0 top-0 mt-4 mr-4">
          <TopNavigation
            newNotifications={newNotifications}
            notifications={notifications}
          />
        </div>
        {!jsonData || !jsonModalData ? (
          <Loader />
        ) : (
          <div className={`${isDesktop ? "min-h-screen mx-36 flex flex-col justify-between items-center relative overflow-x-hidden z-10" : ""}`}>
            <div
              className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
                currentView === ViewType.BubbleChart
                  ? "translate-x-0"
                  : "-translate-x-full"
              }`}
            >
              <div className={`min-h-screen flex flex-col ${isDesktop ? "justify-between" : "justify-around"} items-center`}>
                {/* Use this if you want to display the Sunburst chart instead of the Bubble chart */}
                {/*<SunburstChart
                  data={jsonData}
                  onSelectNode={setProductName}
                  onSelectNodePath={setNodeAncestors}
                />*/}
                <BubbleChart
                  data={jsonData}
                  onSelectNode={setProductName}
                  onSelectNodePath={setNodeAncestors}
                  onZoom={handleZoomChange}
                />
              </div>
            </div>
            {isDesktop && <div
              className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
                currentView === ViewType.BubbleChart
                  ? "translate-x-full"
                  : "translate-x-0"
              }`}
            >
              <div className="min-h-screen flex flex-col items-center">
                <AIProductTable
                  products={jsonModalData}
                  onViewDetails={setProductName}
                />
              </div>
            </div>}
          </div>
        )}
        {currentView === ViewType.BubbleChart && (
          <div className="hidden sm:block absolute bottom-0 left-0 mb-4 ml-4 !z-40">
            <Breadcrumb path={nodeAncestors} />
          </div>
        )}
        {zoomFeatureFlag && currentView === ViewType.BubbleChart && (
          <div className="hidden sm:block absolute bottom-0 right-0 mb-4 mr-4 !z-40">
            <ZoomControl
              zoomPercentage={zoomPercentage}
              onZoomChange={handleZoomChange}
            />
          </div>
        )}
      </div>
      {isModalOpen && productName.length > 0 && (
        <ModalInformation
          onClose={handleIsInfoModalClose}
          nodeName={productName}
          modalData={jsonModalData}
        />
      )}
    </>
  );
}
