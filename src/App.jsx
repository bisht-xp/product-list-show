import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Navbar />
      <div className="w-full mt-16">
        <ProductList />
      </div>
    </div>
  );
}
