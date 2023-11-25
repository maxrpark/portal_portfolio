import { ReactNode, createContext, useContext, useState } from "react";

export enum Section {
  HOME = "HOME",
  PROJECTS = "PROJECTS",
  ABOUT = "ABOUT",
  CONTACT = "CONTACT",
  SOCIAL = "SOCIAL",
}

export type ActiveSection =
  | Section.HOME
  | Section.PROJECTS
  | Section.CONTACT
  | Section.ABOUT
  | Section.SOCIAL;

interface Props {
  children: ReactNode;
}

interface ThreeContextInt {
  activeSection: ActiveSection;
  setActiveSection: React.Dispatch<React.SetStateAction<ActiveSection>>;
}

const ThreeContext = createContext({} as ThreeContextInt);

export const ThreeProvider: React.FC<Props> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(
    Section.HOME
  );

  return (
    <ThreeContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ThreeContext.Provider>
  );
};

export const useThreeContext = () => useContext(ThreeContext);
