import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient(); //拿到在main.tsx 中定义的 queryClient
  //第一个Todo 是服务器返回的数据类型，第二个Todo是发送给服务器的数据类型
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
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
    },
    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};
export default useAddTodo;
