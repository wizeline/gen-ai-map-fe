/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenInNew } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { FC } from "react";
import { AIProducts } from "~/types";
import Pill from "../common/Pill";

interface ModalInformationProps {
  nodeName: string;
  modalData: AIProducts;
  onClose: () => void;
  className?: string;
}

const ModalInformation: FC<ModalInformationProps> = ({
  nodeName,
  modalData,
  onClose,
  className,
}) => {
  const name = nodeName;
  const product = modalData.find((product) => product.name === name);
  const relatedTools = modalData
    ?.filter((p) => p.name !== name && p.ecosystem === product?.ecosystem)
    .map((p) => p.name);
  // TODO - Replace information with actual data from the node
  const bestFeatures: any[] = [];
  // TODO - Replace information with actual data from the node
  const pricing: any[] = [];

  const cleanProductLink = (link: string | undefined) => {
    // remove http, https, :, //, www., and trailing /
    // and added capital leter to firstletter
    return link
      ? link
          .replace(/(^\w+:|^)\/\/|www.|\/$/g, "")
          .replace(/^\w/, (c) => c.toUpperCase())
      : "";
  };

  return (
    product && (
      <div className={`fixed top-4 right-4 w-96 h-auto max-h-[90vh] bg-secondary rounded-md p-2 gap-2 overflow-auto !z-40 ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white border border-primary p-4 mr-2 w-full rounded-md">
            {product?.name}
          </h2>
          <div className="border border-primary rounded-md p-4">
            <IconButton className="!p-0" onClick={onClose}>
              <CloseIcon className="!fill-white" />
            </IconButton>
          </div>
        </div>
        <a href={product?.link} target="_blank" rel="noreferrer">
          <div className="border border-primary rounded-md p-2 mb-2 flex justify-between p-4 items-center">
            <p className="text-blue500 font-montserrat font-medium text-sm leading-[18px]">
              {cleanProductLink(product?.link)}
            </p>
            <OpenInNew className="!fill-primary" />
          </div>
        </a>
        <div className="border border-primary rounded-md p-4 mb-2 grid grid-cols-2 gap-4">
          {product?.name?.length > 0 && (
            <div>
              <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
                Company
              </h3>
              <p className="font-normal text-[14px] leading-[18px] text-white-alt">
                {product?.name}
              </p>
            </div>
          )}
          {product?.ecosystem?.length > 0 && (
            <div>
              <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
                AI Model
              </h3>
              <p className="font-normal text-[14px] leading-[18px] text-white-alt">
                {product?.ecosystem}
              </p>
            </div>
          )}
          {product?.category?.length > 0 && (
            <div>
              <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
                Category
              </h3>
              <p className="font-normal text-[14px] leading-[18px] text-white-alt">
                {product?.category?.join(", ")}
              </p>
            </div>
          )}
          {product?.enterprise_categories?.length > 0 && (
            <div>
              <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
                Industry
              </h3>
              <p className="font-normal text-[14px] leading-[18px] text-white-alt">
                {product?.enterprise_categories?.join(", ")}
              </p>
            </div>
          )}
        </div>
        {product?.description?.length > 0 && (
          <div className="border border-primary rounded-md p-4 mb-2">
            <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
              About
            </h3>
            <p className="font-normal text-[14px] leading-[18px] text-white-alt mb-4 text-justify">
              {product?.description}
            </p>
          </div>
        )}
        {bestFeatures?.length > 0 && (
          <div className="border border-primary rounded-md p-4 mb-2">
            <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
              Best features
            </h3>
            <div className="font-normal text-[14px] leading-[18px] text-white-alt pl-4">
              <ul className="list-disc">
                {bestFeatures.map((feature, index) => (
                  <li key={`${feature}-${index}`}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {product.licence.length > 0 && (
          <div className="border border-primary rounded-md p-4 mb-2">
            <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
              License
            </h3>
            <p className="text-[14px] leading-[18px] text-white-alt">
              <span className="font-bold">License:</span>
              <span className="font-normal"> {product.licence}</span>
            </p>
            {product.state && (
              <p className="text-[14px] leading-[18px] text-white-alt">
                <span className="font-bold">State:</span>
                <span className="font-normal"> {product.state}</span>
              </p>
            )}
          </div>
        )}
        {pricing?.length > 0 && (
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
        )}
        {relatedTools.length > 0 && (
          <div className="border border-primary rounded-md p-4 mb-2">
            <h3 className="font-bold text-[12px] leading-[16px] text-blue300 mb-2">
              Related tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map((tool, index) => {
                return (
                  index < 10 && <Pill key={`${tool}-${index}`}>{tool}</Pill>
                );
              })}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ModalInformation;
