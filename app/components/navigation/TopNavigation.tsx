import React, { useState } from "react";
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

interface Props {
  newNotifications: boolean;
  notifications: NotificationType[];
}

export const TopNavigation: React.FC<Props> = ({
  newNotifications,
  notifications,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnClick = () => {
    if (isModalOpen) {
      handleCloseModal();
    } else {
      handleOpenModal();
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
        <IconButton className="!p-0" onClick={() => {}}>
          <ShareOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
        </IconButton>
        {newsButtonFeatureFlag && (
          <IconButton className="!p-0" onClick={handleOnClick}>
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
      {isModalOpen && (
        <ModalUpdates
          notifications={notifications}
          onClose={handleCloseModal}
          className="fixed top-14 right-4 z-50"
        />
      )}
    </>
  );
};
