import { FC } from "react";
import { WhatsappShareButton, LinkedinShareButton } from "react-share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ShareContentProps {
  url: string;
  title: string;
  onClose: () => void;
  className?: string;
}

const ShareContent: FC<ShareContentProps> = ({
  url,
  title,
  onClose,
  className,
}) => {
  return (
    <div
      className={`h-auto max-h-64 border border-top-nav-border rounded overflow-hidden ${className}`}
    >
      <div className="flex justify-between items-center bg-primary text-white p-2 rounded-t">
        <h2 className="ml-2 font-bold text-sm leading-normal font-montserrat mr-4">
          Share content
        </h2>
        <IconButton className="!p-0" onClick={onClose}>
          <CloseIcon className="!fill-white" />
        </IconButton>
      </div>
      <div className="overflow-y-auto h-full p-6 bg-secondary">
        <div className="flex space-x-2 w-full justify-between">
          <WhatsappShareButton
            url={url}
            title={title}
            className="p-2 rounded-full bg-green-500 text-white"
          >
            <WhatsAppIcon className="!ml-2 !fill-white" />
          </WhatsappShareButton>
          <LinkedinShareButton
            url={url}
            title={title}
            className="p-2 rounded-full bg-blue-500 text-white"
          >
            <LinkedInIcon className="!ml-2 !fill-white" />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareContent;
