import { closestCorners, DndContext } from "@dnd-kit/core";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { updateProductOrder } from "./store/features/product/productSlice";

export default function App() {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Navbar />
      <div className="w-full mt-16">
        <DndContext collisionDetection={closestCorners}>
          <ProductList />
        </DndContext>
      </div>
    </div>
  );
}
