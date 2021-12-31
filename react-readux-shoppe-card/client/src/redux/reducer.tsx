import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface stateAllProductProps {
  favorite: boolean;
  title: string;
  listUrlImage: string[];
  rating: number;
  peopleRate: number;
  peopleBought: number;
  price: number[];
  discount: number;
  color: string[];
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

const initialState: stateAllProductProps[] = [
  {
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
    peopleBought: 115000,
    price: [145.0, 160.0, 240.0, 300.0],
    discount: 25,
    color: ["Cả set", "Váy lẻ", "Lẻ áo cardigan"],
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
];
