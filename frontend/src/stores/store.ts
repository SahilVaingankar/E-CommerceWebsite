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
    // const lowerQuery = query.toLowerCase();
    // let result: any = [];
    let result = get().allProducts.filter(
      (item) =>
        item.title
          .toLowerCase()
          .split(" ")
          .some((word) => word.startsWith(query.toLowerCase())) ||
        (query.length > 1 &&
          item.title.toLowerCase().startsWith(query.toLowerCase()))
    );

    // if (query.length === 1) {
    //   result = get().allProducts.filter((item) =>
    //     item.title
    //       .toLowerCase()
    //       .split(" ")
    //       .some((word) => word.startsWith(lowerQuery))
    //   );
    // } else if (query.length > 1) {
    //   result = get().allProducts.filter((item) =>
    //     item.title.toLowerCase().startsWith(lowerQuery)
    //   );
    // }

    // Fallback: If nothing found, check for partial includes
    if (result.length === 0) {
      for (let index = 0; index < query.length - 1; index++) {
        const slicedQuery = query.slice(index);
        result = get().allProducts.filter((item) =>
          item.title.toLowerCase().includes(slicedQuery)
        );
        if (result.length > 0) {
          break; // stop once a match is found
        }
      }
    }

    set({ searchSuggestions: result });
  },

  filterProducts: (query) => {
    let result = get().allProducts.filter(
      (item) =>
        item.title
          .toLowerCase()
          .split(" ")
          .some((word) => word.startsWith(query.toLowerCase())) ||
        (query.length > 1 &&
          item.title.toLowerCase().startsWith(query.toLowerCase()))
    );

    if (result.length === 0) {
      for (let index = 0; index < query.length - 1; index++) {
        const slicedQuery = query.slice(index);
        result = get().allProducts.filter((item) =>
          item.title.toLowerCase().includes(slicedQuery)
        );
        if (result.length > 0) {
          break; // stop once a match is found
        }
      }
    }

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
