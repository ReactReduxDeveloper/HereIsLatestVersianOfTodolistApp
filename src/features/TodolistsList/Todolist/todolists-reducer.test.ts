import {v1} from "uuid";
import {
  addTodolistAC,
  changeTitleTodolistAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  setTodoListsAC,
  setTodoListsEntityStatusAC,
  TodoListsDomainType,
  todoListsReducer,
} from "./todolists-reducer";
import {FilterType} from "../../../app/App";
import {RequestStatusType} from "../../../app/app-reducer";

let todolistID1: string;
let todolistID2: string;
let startState: TodoListsDomainType[] = [];

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();

  startState = [
    {
      id: todolistID1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todolistID2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todoListsReducer(startState, removeTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});
test("correct todolist should be added", () => {
  const newTodolistTitle = "NewTitle";

  const endState = todoListsReducer(startState, addTodolistAC(startState));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});
test("correct todolist should change name", () => {
  const newTodolistTitle = "NewTitle";

  const endState = todoListsReducer(
    startState,
    changeTitleTodolistAC(newTodolistTitle, todolistID2)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});
test("correct filter of todolist should be changed", () => {
  let newFilter: FilterType = "completed";

  const endState = todoListsReducer(
    startState,
    changeTodolistFilterAC(todolistID2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
test("todolists should be set to the state", () => {
  let newFilter: FilterType = "completed";

  const endState = todoListsReducer([], setTodoListsAC(startState));

  expect(endState.length).toBe(2);
});
test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatusType = "loading";

  const endState = todoListsReducer(
    startState,
    setTodoListsEntityStatusAC(todolistID2, newStatus)
  );

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe("loading");
});
