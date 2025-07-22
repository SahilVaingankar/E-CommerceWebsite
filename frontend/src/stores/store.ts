import { create } from "zustand";

interface Store {
  productData: any;
  filterData: any;
  setData: (data: any) => void;
  setFilterData: (filterData: any) => void;
  searchQuery: (query: string) => void;
  purchaseFormContext: string | null;
  openPurchaseForm: (context: string) => void;
  closePurchaseForm: () => void;
  cartPageQuantity: number;
  setCartPageQuantity: (quantity: number) => void;
}

export const useStore = create<Store>((set, get) => ({
  productData: [],
  filterData: [],
  setData: (data) => set({ productData: data }),
  setFilterData: (filterData) => set({ productData: filterData }),
  searchQuery: (query) => {
    console.log("Running searchQuery with:", query); // ← Add this
    const { productData } = get();
    const result = productData.filter(
      (item: any) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    set({ filterData: result });
  },
  purchaseFormContext: null,
  cartPageQuantity: 1,
  openPurchaseForm: (context) => set({ purchaseFormContext: context }),
  closePurchaseForm: () => set({ purchaseFormContext: null }),
  setCartPageQuantity: (quantity) => set({ cartPageQuantity: quantity }),
}));
