import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient(); //拿到在main.tsx 中定义的 queryClient
  //第一个Todo 是服务器返回的数据类型，第二个Todo是发送给服务器的数据类型
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todosx", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      // savedTodo 是服务器返回的todo
      // newTodo 是 mutationFn 中传入的todo

      // TO update the data after adding new todo
      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"]
      // })

      //APPROACH 2: Updating the data in the cache 直接在缓存数据中加入服务器返回的todo
      // todos 是原来的数据
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => {
          console.log(todo === newTodo, "todo === newTodo");
          // 原视频这里不对，上面的console全是false
          return todo.title === newTodo.title ? savedTodo : todo;
        })
      );
      console.log(savedTodo, "savedTodo");
      console.log(
        queryClient.getQueryData<Todo[]>(["todos"]),
        "queryClient.getQueryData"
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });

  return (
    <>
      {addTodo.error && (
        <p className="alert alert-danger">{addTodo.error.message}</p>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current.value,
              completed: false,
              userId: 1,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
