console.log("Test8");
export default (() => (typeof Symbol === "function" && Symbol.observable) || "@@observable")();
