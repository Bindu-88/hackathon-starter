import configureStore from "./configureStore";
import 'bootstrap/dist/css/bootstrap.min.css';

export * from "./actionCreators";
export { history } from "./configureStore";
export const store = configureStore({});
