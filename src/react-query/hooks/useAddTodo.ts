import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient(); //拿到在main.tsx 中定义的 queryClient
  //第一个Todo 是服务器返回的数据类型，第二个Todo是发送给服务器的数据类型
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);
      onAdd();

      return { previousTodos };
    },
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      // savedTodo 是服务器返回的todo
      // newTodo 是 mutationFn 中传入的todo

      // TO update the data after adding new todo
      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: CACHE_KEY_TODOS
      // })

      //APPROACH 2: Updating the data in the cache 直接在缓存数据中加入服务器返回的todo
      // todos 是原来的数据
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => {
          console.log(todo === newTodo, "todo === newTodo");
          // 原视频这里不对，上面的console全是false
          return todo.title === newTodo.title ? savedTodo : todo;
        })
      );
      console.log(savedTodo, "savedTodo");
      console.log(
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS),
        "queryClient.getQueryData"
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};
export default useAddTodo;
