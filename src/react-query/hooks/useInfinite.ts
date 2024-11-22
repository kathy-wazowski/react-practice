import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PaginationQuery {
  pageSize: number;
}

const useInfinite = <T>(query: PaginationQuery, endpoint: string) =>
  useInfiniteQuery<T[], Error>({
    queryKey: [endpoint, query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get("https://jsonplaceholder.typicode.com" + endpoint, {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, //1min
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default useInfinite;
