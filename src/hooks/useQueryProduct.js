import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchProducts = async ({ search, pageParam = 1 }) => {
  const { data } = await axios.get(
    `http://stageapi.monkcommerce.app/task/products/search`,
    {
      params: { search, page: pageParam, limit: 10 },
      Headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    }
  );
  return data;
};

export const useQueryProduct = ({search}) => {
  const {
    isPending,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({search}) => fetchProducts({search}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      // 
    },
    
  });

  return {
    isPending,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
