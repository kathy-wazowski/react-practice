import "./App.css";
import InfiniteQueries from "./react-query/InfiniteQueries";
import PostList from "./react-query/PostList";
import PostPagination from "./react-query/PostPagination";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <>
      {/* <InfiniteQueries /> */}
      {/* <PostPagination /> */}
      {/* <PostList /> */}
      <TodoForm />
      <TodoList />
    </>
  );
}

export default App;
