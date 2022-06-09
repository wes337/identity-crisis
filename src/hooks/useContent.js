import create from "zustand";
import contentTypes from "../constants/contentTypes";

const content = Object.keys(contentTypes).reduce((initialState, type) => {
  initialState[type] = "";

  return initialState;
}, {});

const useStore = create((set) => ({
  content,
  setContent: (item, value) =>
    set((state) => ({
      ...state,
      content: {
        ...state.content,
        [item]: value,
      },
    })),
  clearContent: () =>
    set((state) => ({
      ...state,
      content,
    })),
}));

function useContent() {
  const contentStore = useStore();

  return contentStore;
}

export default useContent;
