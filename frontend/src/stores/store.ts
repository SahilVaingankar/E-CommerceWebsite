import { create } from "zustand";

interface ProductCardProps {
  title: string;
  rating: number;
  price: number;
  discountPercentage: number;
  images: string[];
  id: number;
}

interface Store {
  allProducts: ProductCardProps[]; // Master data from API
  productData: ProductCardProps[]; // Displayed on the main page
  searchSuggestions: ProductCardProps[]; // Used for search dropdown

  setAllProducts: (data: ProductCardProps[]) => void;
  filterSuggestions: (query: string) => void;
  filterProducts: (query: string) => void;

  purchaseFormContext: string | null;
  openPurchaseForm: (context: string) => void;
  closePurchaseForm: () => void;

  cartPageQuantity: number;
  setCartPageQuantity: (quantity: number) => void;
}

export const useStore = create<Store>((set, get) => ({
  allProducts: [],
  productData: [],
  searchSuggestions: [],

  setAllProducts: (data) => set({ allProducts: data, productData: data }),

  filterSuggestions: (query) => {
    const result = get().allProducts.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    set({ searchSuggestions: result });
  },

  filterProducts: (query) => {
    const result = get().allProducts.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    set({ productData: result });
  },

  purchaseFormContext: null,
  openPurchaseForm: (context) => set({ purchaseFormContext: context }),
  closePurchaseForm: () => set({ purchaseFormContext: null }),

  cartPageQuantity: 1,
  setCartPageQuantity: (quantity) => set({ cartPageQuantity: quantity }),
}));
