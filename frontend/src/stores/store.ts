import { create } from "zustand";

interface ProductCardProps {
  category: string;
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
  allProducts: ProductCardProps[];
  productData: ProductCardProps[];
  searchSuggestions: ProductCardProps[];
  displayProducts: ProductCardProps[];

  filters: {
    category: string | null;
    price: { min: number; max: number };
  };

  setAllProducts: (data: ProductCardProps[]) => void;
  filterProducts: (query: string) => void;
  setSidebarFilterProducts: (query: string) => void;
  sortProducts: (query: "price" | "rating" | "reviews" | "none") => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  filterSuggestions: (query: string) => void;
  applyFilters: () => void;

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
  displayProducts: [],

  filters: {
    category: null,
    price: { min: 0, max: Infinity },
  },

  setAllProducts: (data) =>
    set({
      allProducts: data,
      productData: data,
      displayProducts: data,
    }),

  filterSuggestions: (query) => {
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
        if (result.length > 0) break;
      }
    }

    set({ searchSuggestions: result.slice(0, 8) });
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
        if (result.length > 0) break;
      }
    }

    set({ productData: result, displayProducts: result });
  },

  setSidebarFilterProducts: (query) => {
    set((state) => ({
      filters: {
        ...state.filters,
        category: query === "none" ? null : query,
      },
    }));
    get().applyFilters();
  },

  setPriceRange: ({ min, max }) => {
    set((state) => ({
      filters: {
        ...state.filters,
        price: { min, max },
      },
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { allProducts, filters } = get();
    let filtered = [...allProducts];

    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    const { min, max } = filters.price;
    filtered = filtered.filter((item) => {
      const discounted = Math.floor(
        item.price - (item.price * item.discountPercentage) / 100
      );
      return discounted >= min && discounted <= max;
    });

    set({ displayProducts: filtered });
  },

  sortProducts: (query) => {
    const products = get().displayProducts;

    if (query === "none") {
      get().applyFilters(); // restore the original filtered state
    } else {
      const sorted = [...products].sort((a, b) => b[query] - a[query]);
      set({ displayProducts: sorted });
    }
  },

  purchaseFormContext: null,
  openPurchaseForm: (context) => set({ purchaseFormContext: context }),
  closePurchaseForm: () => set({ purchaseFormContext: null }),

  cartPageQuantity: 1,
  setCartPageQuantity: (quantity) => set({ cartPageQuantity: quantity }),
}));
