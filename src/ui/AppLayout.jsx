import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import PizzaLoader from "./PizzaLoader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto] bg-gray-50">
      {/* Show loader if loading */}
      {isLoading && <PizzaLoader />}

      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="overflow-auto">
        <main className="my-6 mx-auto max-w-3xl px-4">
          <Outlet />
        </main>
      </div>

      {/* Cart overview */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
