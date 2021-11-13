function createChainedFunction(...funcs: any[]) {
  return funcs
    .filter(f => f != null)
    .reduce((acc, f) => {
      if (typeof f !== "function") {
        throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");
      }

      if (acc === null) return f;

      return function chainedFunction(...args: any[]) {
        // @ts-ignore
        acc.apply(this, args);
        // @ts-ignore
        f.apply(this, args);
      };
    }, null);
}

export default createChainedFunction;
