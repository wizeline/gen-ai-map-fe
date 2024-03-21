import WizelineIcon from '../icons/WizelineIcon';

const Header = () => {
  return (
    <header className="bg-white text-white h-[80px] flex items-center justify-between shadow-custom-light md:shadow-custom-dark">
      <div className="container mx-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <WizelineIcon className="col-span-1 md:col-span-2 h-6 w-auto fill-base-wizeline" width="202" height="28" viewBox="0 0 202 28" />
      </div>
    </header>
  );
};

export default Header;