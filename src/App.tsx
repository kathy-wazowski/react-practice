import { useReducer } from "react";
import "./App.css";
import InfiniteQueries from "./react-query/InfiniteQueries";
import PostList from "./react-query/PostList";
import PostPagination from "./react-query/PostPagination";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";
import Counter from "./state-management/Counter";
import LoginStatus from "./state-management/LoginStatus";
import TaskList from "./state-management/TaskList";
import taskReducer from "./state-management/reducers/taskReducer";
import NavBar from "./state-management/NavBar";
import TasksContext from "./state-management/contexts/tasksContext";
import HomePage from "./state-management/HomePage";

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {/* <InfiniteQueries /> */}
      {/* <PostPagination /> */}
      {/* <PostList /> */}
      {/* <TodoForm />
      <TodoList /> */}
      {/* <Counter /> */}
      {/* <TaskList /> */}
      {/* <LoginStatus /> */}
      <NavBar />
      <HomePage />
    </TasksContext.Provider>
  );
}

export default App;
