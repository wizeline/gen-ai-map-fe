import WizelineIcon from '../icons/WizelineIcon';

const HeaderMinimalist = () => {
  return (
    <header className="bg-app-bg h-[80px] items-center mt-4 max-w-[fill-available]">
      <div className="mx-4 flex flex-col md:flex-row justify-between items-center w-full max-w-[fill-available] border-b border-gray-500 pb-2">
        <h1 className="text-l text-gray-500 flex-grow mb-4 md:mb-0">Top 50 AI Tools</h1>
        <WizelineIcon className="h-6 w-auto fill-base-wizeline flex-shrink-0" width="202" height="28" viewBox="0 0 202 28" />
      </div>
    </header>
  );
};

export default HeaderMinimalist;