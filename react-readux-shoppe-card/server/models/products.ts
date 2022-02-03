import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  products: {
    type: Array,

    typeProduct: {
      type: String,
      trim: true,
      required: [true, "Product type must be provided"],
    },
    id: {
      type: Number,
      required: [true, "Product id must be provided"],
    },
    customized: {
      type: Boolean,
      required: [true, "Product customized must be provided"],
    },
    favorite: {
      type: Boolean,
      required: [true, "Product favorite must be provided"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Products title mus be provided"],
    },
    listUrlImage: {
      type: Array,
    },
    rating: {
      type: Number,
      required: [true, "Products rating  must be provided"],
    },
    peopleRating: {
      type: Number,
      required: [true, "Products people rating must be provided"],
    },
    peopleBought: {
      type: Number,
      required: [true, "Products people bought must be provided"],
    },
    price: {
      type: Array,
    },
    discount: {
      type: Number,
      required: [true, "Product discount must provided "],
    },
    types: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    quantity: {
      type: Number,
      required: [true, "Products quantity must be provided"],
    },
    numberOfFavorites: {
      type: Number,
      required: [true, "Products number of favorites must be provided"],
    },
    owner: {
      type: Object,
      name: {
        type: String,
        trim: true,
        required: [true, "Products name must be provided"],
      },
      timeActiveAgo: {
        type: Number,
        required: [true, "Products time active ago must be provided"],
      },
      logoUrl: {
        type: String,
        trim: true,
        required: [true, "Products logo url must be provided"],
      },
      rate: {
        type: Number,
        required: [true, "Products rete must be provided"],
      },
      product: {
        type: Number,
        required: [true, "Products must be provided"],
      },
      responseRate: {
        type: Number,
        required: [true, "Products response rate must be provided"],
      },
      responseTime: {
        type: String,
        trim: true,
        required: [true, "Products response time must be provided"],
      },
      participation: {
        type: String,
        trim: true,
        required: [true, "Products participation must be provided"],
      },
      peopleFlowing: {
        type: Number,
        required: [true, "Products people flowing must be provided"],
      },
    },
    description: {
      type: Object,
      detailProduct: {
        type: Object,
        category: {
          type: Array,
        },
        season: {
          type: String,
          trim: true,
          required: [true, "Products season must be provided"],
        },
        style: {
          type: String,
          trim: true,
          required: [true, "Products style must be provided"],
        },
        waitVersion: {
          type: String,
          trim: true,
          required: [true, "Products wait version must be provided"],
        },
        typeShirt: {
          type: String,
          trim: true,
          required: [true, "Products type skirt must be provided"],
        },
        substance: {
          type: String,
          trim: true,
          required: [true, "Products must be provided"],
        },
        heightSkirt: {
          type: String,
          trim: true,
        },
        sendAddress: {
          type: String,
          trim: true,
        },
      },
      productDescription: {
        type: String,
        trim: true,
      },
    },
  },
});

export default mongoose.model("products", productSchema);
