import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { IconButton } from "@mui/material";

interface Props {
  zoomPercentage: number;
  onZoomChange: (zoomPercentage: number) => void;
}

export const ZoomControl: React.FC<Props> = ({
  zoomPercentage,
  onZoomChange,
}: Props) => {
  const handleZoomIn = () => {
    if (zoomPercentage < 200) {
      onZoomChange(zoomPercentage + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomPercentage > 50) {
      onZoomChange(zoomPercentage - 10);
    }
  };

  const handleResetZoom = () => {
    onZoomChange(100);
  };

  return (
    <div className="flex justify-between items-center border border-top-nav-border rounded w-30 h-9 p-2 bg-primary w-[120px] h-[36px]">
      <IconButton className="!p-0" onClick={handleZoomOut}>
        <ZoomOutIcon className="w-5 h-5 !fill-white cursor-pointer" />
      </IconButton>
      <span
        className="text-white font-montserrat font-bold text-xs leading-4"
        onClick={handleResetZoom}
        onKeyDown={handleResetZoom}
        role="button"
        tabIndex={0}
      >
        {zoomPercentage}%
      </span>

      <IconButton className="!p-0" onClick={handleZoomIn}>
        <ZoomInIcon className="w-5 h-5 !fill-white cursor-pointer" />
      </IconButton>
    </div>
  );
};
