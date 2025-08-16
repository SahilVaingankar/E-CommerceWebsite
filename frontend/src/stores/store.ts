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
  isSidebarOpen: boolean;
  min: number | undefined;
  max: number | undefined;
  selectedCategory: string;
  setMin: (min: number | undefined) => void;
  setMax: (max: number | undefined) => void;
  darkMode: boolean;
  toggleMode: () => void;
  setSelectedCategory: (category: string) => void;
  reset: () => void;
  login: boolean;
  setLogin: (state: boolean) => void;

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
  setIsSidebarOpen: () => void;

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
  isSidebarOpen: false,
  min: undefined,
  max: undefined,
  selectedCategory: "All",
  setMin: (min) => set({ min }),
  setMax: (max) => set({ max }),
  darkMode:
    localStorage.getItem("darkMode") !== null
      ? localStorage.getItem("darkMode") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,

  toggleMode: () => {
    set((state) => {
      const newMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", newMode.toString());
        document.documentElement.classList.toggle("dark", newMode);
      }
      return { darkMode: newMode };
    });
  },

  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  reset: () => {
    set({
      selectedCategory: "All",
      min: undefined,
      max: undefined,
    });
  },

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
        category: query === "All" ? null : query,
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
    const { allProducts, filters, productData } = get();
    if (
      !filters.category &&
      filters.price.min === 0 &&
      filters.price.max === Infinity
    ) {
      set({ displayProducts: productData });
      return;
    }

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

  setIsSidebarOpen: () => {
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    }));
  },

  purchaseFormContext: null,
  openPurchaseForm: (context) => set({ purchaseFormContext: context }),
  closePurchaseForm: () => set({ purchaseFormContext: null }),

  cartPageQuantity: 1,
  setCartPageQuantity: (quantity) => set({ cartPageQuantity: quantity }),

  login: false,
  setLogin: (state) => set({ login: state }),
}));
