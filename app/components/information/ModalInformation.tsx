/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenInNew } from "@mui/icons-material";
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
    <div className="fixed top-4 right-4 w-96 h-auto max-h-[90vh] bg-secondary rounded-md p-2 gap-2 overflow-auto z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white border border-primary p-4 mr-2 w-full rounded-md">
          {node?.name}
        </h2>
        <div className="border border-primary rounded-md p-4">
          <IconButton className="!p-0" onClick={onClose}>
            <CloseIcon className="!fill-white" />
          </IconButton>
        </div>
      </div>
      <a href="https://fireflies.ai/" target="_blank" rel="noreferrer">
        <div className="border border-primary rounded-md p-2 mb-2 flex justify-between p-4 items-center">
          <p className="text-blue500 font-montserrat font-medium text-sm leading-[18px]">
            Fireflies.ai
          </p>
          <OpenInNew className="!fill-primary" />
        </div>
      </a>
      <div className="border border-primary rounded-md p-4 mb-2 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
            Company
          </h3>
          <p className="font-normal text-[14px] leading-[18px] text-white-alt">
            Fireflies.ai Corp.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
            AI Model
          </h3>
          <p className="font-normal text-[14px] leading-[18px] text-white-alt">
            Data and Integration Services
          </p>
        </div>
        <div>
          <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
            Category
          </h3>
          <p className="font-normal text-[14px] leading-[18px] text-white-alt">
            Data and Simulation Generation
          </p>
        </div>
        <div>
          <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
            Industry
          </h3>
          <p className="font-normal text-[14px] leading-[18px] text-white-alt">
            Customer Segmentation
          </p>
        </div>
      </div>
      <div className="border border-primary rounded-md p-4 mb-2">
        <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
          About
        </h3>
        <p className="font-normal text-[14px] leading-[18px] text-white-alt mb-4">
          Fireflies is an AI meeting assistant software for note-taking and
          transcribing voices in real-time. Whether you’re in the midst of a
          brainstorming session or uploading files from a customer interview,
          Fireflies can instantly capture your conversations in writing.{" "}
        </p>
        <p className="font-normal text-[14px] leading-[18px] text-white-alt">
          Regardless of accent, dialect, industry, or language, this meeting
          assistant can detect even the smallest differences in speech for
          precise transcriptions on the first try.{" "}
        </p>
      </div>
      <div className="border border-primary rounded-md p-4 mb-2">
        <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
          Best features
        </h3>
        <div className="font-normal text-[14px] leading-[18px] text-white-alt pl-4">
          <ul className="list-disc">
            <li>
              Integrations to connect Fireflies with other meeting platforms
              like Google Meet, Zoom, Microsoft Teams, Skype, and more.
            </li>
            <li>
              Rich text editing features to correct, comment, annotate, and
              format transcripts as needed.
            </li>
            <li>
              Smart summaries to grab the key points, next steps, questions, and
              discussion highlights from your meeting.
            </li>
            <li>
              Search and organization features to isolate words, phrases, and
              topics in your transcripts.
            </li>
          </ul>
        </div>
      </div>
      <div className="border border-primary rounded-md p-4 mb-2">
        <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
          Pricing
        </h3>
        <p className="text-[14px] leading-[18px] text-white-alt">
          <span className="font-bold">Personal:</span>
          <span className="font-normal"> Free</span>
        </p>
        <p className="text-[14px] leading-[18px] text-white-alt">
          <span className="font-bold">Professional:</span>
          <span className="font-normal"> $10 per month</span>
        </p>
        <p className="text-[14px] leading-[18px] text-white-alt">
          <span className="font-bold">Team:</span>
          <span className="font-normal"> $20 per user, per month</span>
        </p>
      </div>
      {/*Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border border-primary rounded-md p-2 mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
          </div>
        ))*/}
    </div>
  );
};

export default ModalInformation;
