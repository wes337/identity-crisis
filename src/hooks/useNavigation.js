import create from "zustand";

const useStore = create((set) => ({
  activeSection: "",
  setActiveSection: (activeSection) => set(() => ({ activeSection })),
}));

function useNavigation() {
  const { activeSection, setActiveSection } = useStore();

  return { activeSection, setActiveSection };
}

export default useNavigation;
