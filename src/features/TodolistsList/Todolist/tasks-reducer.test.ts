import { removeTaskAC, setTasksAC, tasksReducer } from "./tasks-reducer";
import { TasksStateType } from "../../../app/App";
import { TaskPriorities, TaskStatues } from "../../../api/todolists_api";

const startState: TasksStateType = {
  todolistId1: [
    {
      id: "1",
      title: "CSS",
      status: TaskStatues.New,
      order: 0,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      addedDate: "",
    },
    {
      id: "2",
      title: "JS",
      status: TaskStatues.Completed,
      order: 0,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      addedDate: "",
    },
    {
      id: "3",
      title: "React",
      status: TaskStatues.New,
      order: 0,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      addedDate: "",
    },
  ],
  todolistId2: [
    {
      id: "1",
      title: "bread",
      status: TaskStatues.New,
      order: 0,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId2",
      addedDate: "",
    },
    {
      id: "2",
      title: "milk",
      status: TaskStatues.Completed,
      order: 0,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId2",
      addedDate: "",
    },
    {
      id: "3",
      title: "tea",
      status: TaskStatues.New,
      order: 0,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId2",
      addedDate: "",
    },
  ],
};

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC("3", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatues.New,
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatues.Completed,
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatues.New,
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatues.New,
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatues.Completed,
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        addedDate: "",
      },
    ],
  });
});
/*
test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = AddTaskAC('todolistId2', 'juce',)

    const endState = TasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = ChangeTaskCheckboxAC('2', false, 'todolistId2')

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBe(true)
    expect(endState["todolistId2"][1].isDone).toBe(false)
})
test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = ChangeTitleTaskAC('2', "MilkyWay", 'todolistId2')

    const endState = TasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS')
    expect(endState["todolistId2"][1].title).toBe("MilkyWay")
})
test('adding todolist', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = AddTodolistAC("title no matter")
    const endState = TasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error("new key shold be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toBe([])
})
test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistId2')

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
*/
test("tasks should be added to todolist", () => {
  const action = setTasksAC(startState["todolistId1"], "todolistId1");

  const endState = tasksReducer(
    {
      todolistId1: [],
      todolistId2: [],
    },
    action
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});
