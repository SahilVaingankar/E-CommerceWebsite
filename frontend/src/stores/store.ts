import { create } from "zustand";

interface ProductCardProps {
  trim(): string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  none: string;
  discountPercentage: number;
  images: string[];
  id: number;
}

interface Store {
  allProducts: ProductCardProps[]; // Master data from API
  productData: ProductCardProps[]; // Displayed on the main page
  searchSuggestions: ProductCardProps[]; // Used for search dropdown
  sortedProducts: ProductCardProps[];
  displayProducts: ProductCardProps[];

  setAllProducts: (data: ProductCardProps[]) => void;
  filterProducts: (query: string) => void;
  sortProducts: (query: "price" | "rating" | "reviews" | "none") => void;
  filterSuggestions: (query: string) => void;

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
  sortedProducts: [],
  displayProducts: [],

  setAllProducts: (data) =>
    set({ allProducts: data, productData: data, displayProducts: data }),

  filterSuggestions: (query) => {
    const result = get().allProducts.filter(
      (item) =>
        item.title
          .toLowerCase()
          .split(" ")
          .some((word) => word.startsWith(query.toLowerCase())) ||
        item.title.toLowerCase().startsWith(query.toLowerCase())
    );
    set({ searchSuggestions: result });
  },

  filterProducts: (query) => {
    const result = get().allProducts.filter(
      (item) =>
        item.title
          .toLowerCase()
          .split(" ")
          .some((word) => word.startsWith(query.toLowerCase())) ||
        item.title.toLowerCase().startsWith(query.toLowerCase())
    );
    set({ productData: result });
    set({ displayProducts: get().productData });
  },

  sortProducts: (query) => {
    console.log(query);

    let result: ProductCardProps[] = get().productData;
    // result =
    query === "none"
      ? set({
          displayProducts: result,
        })
      : set({
          displayProducts: result.slice().sort((a, b) => b[query] - a[query]),
        });

    // let result = get().productData;

    // if (query !== "none") {
    //   result = result.slice().sort((a, b) => b[query] - a[query]);
    // }

    // set({ productData: result });
  },

  purchaseFormContext: null,
  openPurchaseForm: (context) => set({ purchaseFormContext: context }),
  closePurchaseForm: () => set({ purchaseFormContext: null }),

  cartPageQuantity: 1,
  setCartPageQuantity: (quantity) => set({ cartPageQuantity: quantity }),
}));
