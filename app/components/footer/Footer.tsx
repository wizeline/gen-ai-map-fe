import WizelineIcon from "../icons/WizelineIcon";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }: FooterProps) => {
  return (
    <footer className={`bg-footer text-white px-6 py-4 ${className}`}>
      <div className="container mx-auto flex flex-wrap md:flex-nowrap justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0">
        </div>
        <div className="w-full md:w-1/4">
          <span className="mb-2"></span>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <span className="mb-2">
            <WizelineIcon className="w-auto fill-white" width="101" height="14" />
          </span>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <span className="mb-2"></span>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;