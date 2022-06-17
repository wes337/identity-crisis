import create from "zustand";

const useStore = create((set) => ({
  avatars: [],
  loading: false,
  setAvatars: (value) => set(() => ({ avatars: value })),
  setLoading: (value) => set((state) => ({ ...state, loading: value })),
}));

function useAvatars() {
  const { avatars, setAvatars, loading, setLoading } = useStore();

  return { avatars, setAvatars, loading, setLoading };
}

export default useAvatars;
