import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface stateAllProductProps {
  customized: boolean;
  id: any;
  favorite: boolean;
  title: string;
  listUrlImage: string[];
  rating: number;
  peopleRate: number;
  peopleBought: number;
  price: number[];
  discount: number;
  types: string[];
  sizes: string[];
  quantity: number;
  numberOfFavorites: number;
  owner: {
    name: string;
    timeActiveAgo: number;
    logoUrl: string;
    rate: number;
    product: number;
    responseRate: number;
    responseTime: string;
    participation: string;
    peopleFlowing: number;
  };
  description: {
    detailProduct: {
      category: string[];
      season: string;
      style: string;
      waitVersion: string;
      typeSkirt: string;
      substance: string;
      heightSkirt: string;
      sendAddress: string;
    };
    productDescription: string;
  };
}


export interface typesInitialStateProductProps {
  products: stateAllProductProps[];
  productUser: stateAllProductProps[];
  product: any;
}
const initialStateProducts: typesInitialStateProductProps = {
  products: [
    {
      id: 1,
      customized: true,
      favorite: true,
      title: "Váy Hai Dây Hoa Nhí/ Áo Khoác Cardigan Mỏng HT01 Phong Cách Hàn Quốc",
      listUrlImage: [
        "https://cf.shopee.vn/file/00b1514bbdb6902a718e1840def66ee3",
        "https://cf.shopee.vn/file/0c751c8dfee2c6830256682a1b5602d6",
        "https://cf.shopee.vn/file/be81cb6058981121c9edfaf186f68324",
        "https://cf.shopee.vn/file/0e7e462c8d1ad153623fce5c31294c57",
        "https://cf.shopee.vn/file/7f85f8545242274034c553dd577af49d",
        "https://cf.shopee.vn/file/6c68a1106638bb5199276f1b5fdcec68",
      ],
      rating: 5.0,
      peopleRate: 5400,
      peopleBought: 11000,
      price: [145.0, 160.0, 240.0, 300.0],
      discount: 25,
      types: ["Cả set", "Váy lẻ", "Lẻ áo cardigan"],
      sizes: ["XS", "S", "M", "L"],
      quantity: 1176,
      numberOfFavorites: 23400,
      owner: {
        name: "thuhaluuthi",
        timeActiveAgo: 7,
        logoUrl: "https://cf.shopee.vn/file/e11d1467572342111e0ea5b8f138f3d9_tn",
        rate: 8200,
        product: 329,
        responseRate: 100,
        responseTime: "trong vai gio",
        participation: "5 năm trước ",
        peopleFlowing: 33700,
      },
      description: {
        detailProduct: {
          category: ["Shopee", "Women Clothes", "Skirts"],
          season: "mùa thu",
          style: "Hàn Quốc",
          waitVersion: "Bản to",
          typeSkirt: "váy xòe",
          substance: "Đũi lạnh",
          heightSkirt: "~100cm không tính dây",
          sendAddress: "Huyện Gia lâm,Hà Nội",
        },
        productDescription: "Update",
      },
    },
  ],
  productUser: [],
  product: null,
};

export interface typeStateProfileUserProps {
  nameSignIn: string;
  name: string;
  email: string;
  numberPhone: string;
  nameShop: string;
  sex: string;
  birth: string;
  password: string;
  address: string;
  urlImage: string;
}
export interface typeStateStoreUserProps {
  id: any;
  types: string;
  size: string;
  quantity: number;
  isBought: boolean;
}
export interface typeStateUserProps {
  profile: typeStateProfileUserProps;
  stores: typeStateStoreUserProps[];
}
export interface typeUsersProps {
  users: typeStateUserProps[];
  user: typeStateUserProps | any;
}
const initialStateUsers: typeUsersProps = {
  users: [
    {
      profile: {
        nameSignIn: "random",
        name: "",
        email: "ttctde@gmail.com",
        numberPhone: "0912207142",
        nameShop: "",
        sex: "",
        birth: "27-01-2003",
        password: "2003",
        address: "",
        urlImage:
          "https://scontent.fhan4-3.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=KDrWhKdadx4AX9SilKU&_nc_ht=scontent.fhan4-3.fna&oh=00_AT__Lo84sx1SoiBGnKKxeKtmIQOv5lOnjVw7hmak4uWnCw&oe=6200C278",
      },
      stores: [
        {
          id: 1,
          types: "Cả set",
          size: "L",
          quantity: 1,
          isBought: false,
        },
      ],
    },
  ],
  user: {
    profile: {
      nameSignIn: "",
      name: "",
      email: "",
      numberPhone: "",
      nameShop: "",
      sex: "",
      birth: "",
      password: "",
      address: "",
      urlImage: "",
    },
    stores: [],
  },
};

const productReducer = createSlice({
  name: "products",
  initialState: initialStateProducts,
  reducers: {
    updateProductUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        productUser: action.payload.map((productUser: typeStateStoreUserProps) => {
          return state.products.find(product => product.id === productUser.id);
        }),
      };
    },
    addProduct: (state, action: PayloadAction<stateAllProductProps>) => {
      state.products.push(action.payload);
      return state;
    },
    getProduct: (state, action) => {
      return {
        ...state,
        product: state.products.find(product => String(product.id) === String(action.payload)),
      };
    },
  },
});
const userReducer = createSlice({
  name: "users",
  initialState: initialStateUsers,
  reducers: {
    updateUser: (state: typeUsersProps, action: PayloadAction<typeStateUserProps>) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    getUser: (
      state: typeUsersProps,
      action: PayloadAction<{ nameSignIn: string; password: string }>,
    ) => {
      return {
        ...state,
        user: state.users.find((user: typeStateUserProps) => {
          return (
            String(user.profile.nameSignIn) === String(action.payload.nameSignIn) &&
            String(action.payload.password) === String(user.profile.password)
          );
        }),
      };
    },
    addProductStoreUser: (state, action: PayloadAction<typeStateStoreUserProps>) => {
      return {
        ...state,
        user: {
          ...state.user,
          stores: [...state.user.stores, action.payload],
        },
      };
    },
    deleteProductStoreUser: (state, action: PayloadAction<typeStateStoreUserProps>) => {
      return {
        ...state,
        user: {
          ...state.user,
          stores: state.user.stores.filter(
            (store: typeStateStoreUserProps) => store === action.payload,
          ),
        },
      };
    },
    updateProductStoreUser: (state, action: PayloadAction<typeStateStoreUserProps>) => {
      return {
        ...state,
        user: {
          ...state.user,
          stores: state.user.stores.map((store: typeStateStoreUserProps) => {
            if (
              store.id === action.payload.id &&
              store.types === action.payload.types &&
              store.size === action.payload.size
            ) {
              return action.payload;
            }
            return store;
          }),
        },
      };
    },
    updateClient: (state: typeUsersProps, action: PayloadAction<{ nameSignIn: string }>) => {
      return {
        ...state,
        users: state.users.map((user: typeStateUserProps) =>
          String(user.profile.nameSignIn) === String(action.payload.nameSignIn) ? state.user : user,
        ),
      };
    },
  },
});

export const { addProduct, updateProductUser, getProduct } = productReducer.actions;
export const {
  updateUser,
  getUser,
  updateClient,
  addProductStoreUser,
  deleteProductStoreUser,
  updateProductStoreUser,
} = userReducer.actions;

export const usersReducer = userReducer.reducer;
export const productsReducer = productReducer.reducer;
