/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import { BubbleChart } from "@mui/icons-material";

export enum ViewType {
  Table,
  BubbleChart,
}

interface ViewSwitcherProps {
  onSwitch?: (args?: any) => void;
}

const ViewSwitcher: FC<ViewSwitcherProps> = ({ onSwitch }) => {
  const [currentView, setCurrentView] = useState<ViewType>(
    ViewType.BubbleChart
  );

  const handleTableClick = () => {
    setCurrentView(ViewType.Table);
    if (onSwitch) {
      onSwitch(ViewType.Table);
    }
  };

  const handleChartClick = () => {
    setCurrentView(ViewType.BubbleChart);
    if (onSwitch) {
      onSwitch(ViewType.BubbleChart);
    }
  };

  return (
    <div className="flex justify-between items-center border border-top-nav-border rounded w-28 h-9 p-2 bg-primary fixed right-1/2 transform translate-x-1/2">
      <IconButton className="!p-0" onClick={handleChartClick}>
        <BubbleChart
          className={`w-5 h-5 cursor-pointer ${
            currentView === ViewType.BubbleChart
              ? "!fill-white"
              : "!fill-gray-500"
          }`}
        />
      </IconButton>
      <IconButton className="!p-0" onClick={handleTableClick}>
        <TableChartIcon
          className={`w-5 h-5 cursor-pointer ${
            currentView === ViewType.Table ? "!fill-white" : "!fill-gray-500"
          }`}
        />
      </IconButton>
    </div>
  );
};

export default ViewSwitcher;
