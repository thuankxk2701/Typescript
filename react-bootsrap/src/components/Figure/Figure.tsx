import createWithBsPrefix from "../createWithBsPrefix";
import FigureCaption from "./FigureCaption";
import FigureImage from "./FigureImage";

const Figure = createWithBsPrefix("figure", {
  Component: "figure",
});

export default Object.assign(Figure, {
  Image: FigureImage,
  Caption: FigureCaption,
});
