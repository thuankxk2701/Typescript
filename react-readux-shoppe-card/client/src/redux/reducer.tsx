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
  size: string[];
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
export interface typesInitialStateProps {
  products: stateAllProductProps[];
  product: any;
}
const initialStateProducts: typesInitialStateProps = {
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
      size: ["XS", "S", "M", "L"],
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
  quantity: string;
}
export interface typeUsersProps {
  users: {
    profile: typeStateProfileUserProps;
    stores: typeStateStoreUserProps[];
  }[];
  user: any;
}
const initialStateUsers: typeUsersProps = {
  users: [
    {
      profile: {
        nameSignIn: "randomName1231",
        name: "",
        email: "ttctde@gmail.com",
        numberPhone: "0912207142",
        nameShop: "",
        sex: "",
        birth: "27-01-2003",
        password: "2003",
        address: "",
        urlImage: "../assets/image/avatar.jpg",
      },
      stores: [],
    },
  ],
  user: null,
};

const productReducer = createSlice({
  name: "products",
  initialState: initialStateProducts,
  reducers: {
    getProduct: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        product: state.products.find(
          productItem => String(productItem.id) === String(action.payload),
        ),
      };
    },
    addProduct: (state, action: PayloadAction<stateAllProductProps>) => {
      state.products.push(action.payload);
      return state;
    },
  },
});
const userReducer = createSlice({
  name: "users",
  initialState: initialStateUsers,
  reducers: {
    updateStore: (state, action: PayloadAction<typeStateStoreUserProps>) => {
      return {
        ...state,
        store: [
          state.users.stores.map(store =>
            String(store.id) === String(action.payload.id) ? action.payload : store,
          ),
        ],
      };
    },

    updateUser: (state, action: PayloadAction<typeStateProfileUserProps>) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
  },
});

export const { addProduct, getProduct } = productReducer.actions;
export const productsReducer = productReducer.reducer;