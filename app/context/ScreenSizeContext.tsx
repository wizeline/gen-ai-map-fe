import { FC, createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

interface ScreenSizeContextProps {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const ScreenSizeContext = createContext<ScreenSizeContextProps | undefined>(
  undefined
);

interface ScreenSizeProviderProps {
  children: React.ReactNode;
}

export const ScreenSizeProvider: FC<ScreenSizeProviderProps> = ({
  children,
}) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <ScreenSizeContext.Provider value={{ isDesktop, isTablet, isMobile }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};
