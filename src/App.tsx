import { useReducer } from "react";
import "./App.css";
import InfiniteQueries from "./react-query/InfiniteQueries";
import PostList from "./react-query/PostList";
import PostPagination from "./react-query/PostPagination";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";
import Counter from "./state-management/counter/Counter";
import LoginStatus from "./state-management/auth/LoginStatus";
import NavBar from "./state-management/NavBar";
import TasksContext from "./state-management/tasks/tasksContext";
import HomePage from "./state-management/HomePage";
import AuthProvider from "./state-management/auth/AuthProvider";
import { TasksProvider } from "./state-management/tasks";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        {/* <InfiniteQueries /> */}
        {/* <PostPagination /> */}
        {/* <PostList /> */}
        {/* <TodoForm />
      <TodoList /> */}
        <Counter />
        {/* <TaskList /> */}
        {/* <LoginStatus /> */}
        <NavBar />
        <HomePage />
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
