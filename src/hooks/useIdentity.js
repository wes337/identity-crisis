import create from "zustand";

const useStore = create((set) => ({
  identity: "",
  setIdentity: (value) => set(() => ({ identity: value })),
}));

function useIdentity() {
  const { identity, setIdentity } = useStore();

  return { identity, setIdentity };
}

export default useIdentity;
