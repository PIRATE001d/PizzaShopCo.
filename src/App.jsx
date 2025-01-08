import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Order, { loader as OrderLoader } from "./features/order/Order";
import NewOrder, { Action as NewOrderAction } from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import ErrorPage from "./ui/Error";
import ErrorMessage from "./ui/ErrorNotification";
import { Provider } from 'jotai';

const BrowserRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/:OrderId",
        element: <Order />,
        loader: OrderLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/order",
        element: <Order />,
        loader: OrderLoader,
        errorElement: <ErrorMessage />,
      },
      {
        path: "/order/new",
        element: <NewOrder />,
        action: NewOrderAction,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: MenuLoader,
        errorElement: <ErrorMessage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider>
      <RouterProvider router={BrowserRouter} />
    </Provider>
  );
}

export default App;
