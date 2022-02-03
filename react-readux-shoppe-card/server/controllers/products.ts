import Products from "../models/products";

const getAllProducts = async (req: any, res: any) => {
  try {
    const products = Products.find({});
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ msg: error });
  }
};

const getProduct = async (req: any, res: any) => {
  try {
    const { id: productId } = req.params;
    const product = await Products.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ msg: `No product with id:${product}` });
    }
    res.status(200).json({ product });
  } catch (error: any) {
    res.status(500).json({ msg: error });
  }
};

export { getAllProducts, getProduct };
