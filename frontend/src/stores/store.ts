import { create } from "zustand";

interface Store {
  isPurchaseFormOpen: boolean;
  openPurchaseForm: () => void;
  closePurchaseForm: () => void;
}

export const useStore = create<Store>((set) => ({
  isPurchaseFormOpen: false,
  openPurchaseForm: () => set({ isPurchaseFormOpen: true }),
  closePurchaseForm: () => set({ isPurchaseFormOpen: false }),
}));
