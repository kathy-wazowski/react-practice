import "./App.css";
import InfiniteQueries from "./react-query/InfiniteQueries";
import PostList from "./react-query/PostList";
import PostPagination from "./react-query/PostPagination";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";
import Counter from "./state-management/Counter";
import LoginStatus from "./state-management/LoginStatus";
import TaskList from "./state-management/TaskList";

function App() {
  return (
    <>
      {/* <InfiniteQueries /> */}
      {/* <PostPagination /> */}
      {/* <PostList /> */}
      {/* <TodoForm />
      <TodoList /> */}
      {/* <Counter /> */}
      {/* <TaskList /> */}
      <LoginStatus />
    </>
  );
}

export default App;
