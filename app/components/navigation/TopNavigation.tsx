import React, { useEffect, useState } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, IconButton } from "@mui/material";
import { ModalUpdates } from "../updates/ModalUpdates";
import { NotificationType } from "~/types";
import {
  helpButtonFeatureFlag,
  newsButtonFeatureFlag,
} from "~/utils/featureFlags";
import ShareContent from "../common/ShareContent";

interface Props {
  newNotifications: boolean;
  notifications: NotificationType[];
}

export const TopNavigation: React.FC<Props> = ({
  newNotifications,
  notifications,
}: Props) => {
  const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState(false);
  const [isShareModalOpen, setIsSharesModalOpen] = useState(false);
  const [shareContentUrl, setShareContentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareContentUrl(window.location.origin);
    }
  }, []);

  const handleUpdateOpenModal = () => {
    setIsUpdatesModalOpen(true);
  };

  const handleUpdateCloseModal = () => {
    setIsUpdatesModalOpen(false);
  };

  const handleShareOpenModal = () => {
    setIsSharesModalOpen(true);
  };

  const handleShareCloseModal = () => {
    setIsSharesModalOpen(false);
  };

  const handleUpdateOnClick = () => {
    if (isUpdatesModalOpen) {
      handleUpdateCloseModal();
    } else {
      handleUpdateOpenModal();
    }
  };

  const handleShareOnClick = () => {
    if (isUpdatesModalOpen) {
      handleShareCloseModal();
    } else {
      handleShareOpenModal();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border border-top-nav-border rounded w-auto h-9 p-2 gap-4 bg-primary">
        {helpButtonFeatureFlag && (
          <IconButton className="!p-0" onClick={() => {}}>
            <HelpOutlineOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
          </IconButton>
        )}
        <IconButton className="!p-0" onClick={handleShareOnClick}>
          <ShareOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
        </IconButton>
        {newsButtonFeatureFlag && (
          <IconButton className="!p-0" onClick={handleUpdateOnClick}>
            {!newNotifications ? (
              <NotificationsOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
            ) : (
              <Badge
                overlap="circular"
                variant="dot"
                color="error"
                invisible={!newNotifications}
              >
                <NotificationsOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
              </Badge>
            )}
          </IconButton>
        )}
      </div>
      {isUpdatesModalOpen && (
        <ModalUpdates
          notifications={notifications}
          onClose={handleUpdateCloseModal}
          className="fixed top-14 right-4 z-50"
        />
      )}
      {isShareModalOpen && shareContentUrl && (
        <ShareContent
          url={shareContentUrl}
          title={"Wizeline Gen AI Map"}
          onClose={handleShareCloseModal}
          className="fixed top-14 right-4 z-50"
        />
      )}
    </>
  );
};
