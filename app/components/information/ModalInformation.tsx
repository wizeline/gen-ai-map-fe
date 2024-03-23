/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { FC } from "react";
import { NodeType } from "~/types";

interface ModalInformationProps {
  node: NodeType | null;
  onClose: () => void;
}

const ModalInformation: FC<ModalInformationProps> = ({ node, onClose }) => {
  console.log(node?.__dataNode);
  return (
    <div className="fixed top-4 right-4 w-96 h-auto bg-secondary rounded-md p-2 gap-2 overflow-auto z-50">
      <div className="flex justify-between items-center">
        <h2 className="text-white border border-primary p-2 w-full rounded-md">
          {node?.name}
        </h2>
        <div className="border border-primary rounded-md p-2">
          <IconButton className="!p-0" onClick={onClose}>
            <CloseIcon className="!fill-white" />
          </IconButton>
        </div>
      </div>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border border-primary rounded-md p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
          </div>
        ))}
    </div>
  );
};

export default ModalInformation;
