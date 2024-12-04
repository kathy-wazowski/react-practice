import { create } from "zustand";

interface UserStore {
  user?: string;
  logIn: (name: string) => void;
  logOut: () => void;
}
const useUserStore = create<UserStore>((set) => ({
  user: "",
  logIn: (userName: string) => set(() => ({ user: userName })),
  logOut: () => set({ user: "" }),
}));

export default useUserStore;
