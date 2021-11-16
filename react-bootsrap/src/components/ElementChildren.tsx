import * as React from "react";

function map<P = any>(children: any, func: (el: React.ReactElement<P>, index: number) => any) {
  let index = 0;
  return React.Children.map(children, child =>
    React.isValidElement<P>(child) ? func(child, index++) : child,
  );
}

function forEach<P = any>(children: any, func: (el: React.ReactElement<P>, index: number) => void) {
  let index = 0;
  React.Children.forEach(children, child => {
    if (React.isValidElement<P>(child)) func(child, index++);
  });
}
export { map, forEach };
