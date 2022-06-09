import create from "zustand";

const useStore = create((set) => ({
  loading: false,
  setLoading: (value) => set((state) => ({ ...state, loading: value })),
}));

function useLoading() {
  const { loading, setLoading } = useStore();

  return { loading, setLoading };
}

export default useLoading;
