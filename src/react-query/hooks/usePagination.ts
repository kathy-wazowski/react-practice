import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PaginationQuery {
  page: number;
  pageSize: number;
}

const usePagination = <T>(query: PaginationQuery, endpoint: string) =>
  useQuery<{ data: T[]; total: number }, Error>({
    queryKey: [endpoint, query],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com" + endpoint, {
          params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => {
          const total = parseInt(res.headers["x-total-count"]);
          return {
            data: res.data,
            total,
          };
        }),
    keepPreviousData: true,
  });

export default usePagination;
