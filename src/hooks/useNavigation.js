import create from "zustand";

const useStore = create((set) => ({
  activeSection: "",
  setActiveSection: (activeSection) =>
    set((state) => ({ ...state, activeSection })),
}));

function useNavigation() {
  const { activeSection, setActiveSection } = useStore();

  return { activeSection, setActiveSection };
}

export default useNavigation;
