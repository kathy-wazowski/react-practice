import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = () => {
  const queryFn = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);
  // 在这里传入type 参数，打完<可以看到参数提醒
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn,
    staleTime: 10 * 1000, // 10s
  });
};
export default usePosts;
