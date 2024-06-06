import './App.css'
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const getFromLocalStorage = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal)
    }
  }

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = () => {
    if (!todo) return alert("Please enter a todo")
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })

    let confirm = window.confirm("Are you sure?")

    if (confirm === true) {
      setTodos(newTodos)
    }
    saveToLocalStorage()
  }

  const handleEdit = (id) => {
    let value
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        value = todo.todo
      }
      return todo
    }))
    setTodo(value)
    saveToLocalStorage()
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleUpdateTodo = () => {
    let neId = todos.map((todo) => todo.id)
    console.log(neId)
  }


  return (
    <div className=" font-serif flex flex-col">
      <Navbar />
      <div className='flex flex-col justify-center items-center'>
        <div className='text-3xl font-bold p-9'>
          Todo
        </div>
        <div className='w-[500px] h-[300px] bg-slate-500 flex flex-col p-8 justify-center items-center rounded-md'>
          <label className="text-5xl pb-8">Todo List for my day</label>
          <input onChange={handleChange} value={todo} className="p-2 rounded w-full outline-none" type="text" placeholder='Enter your Todo' />
          <div className="flex gap-5">
            <button onClick={handleAddTodo} className="bg-blue-700 text-white p-2 px-9 w-[100px] rounded mt-5">Add</button>
            <button onClick={handleUpdateTodo} className="bg-blue-700 text-white p-2 px-9 w-[100px] rounded mt-5">Update</button>
          </div>
        </div>
        <div className="w-1/2  bg-slate-400 flex p-8 mt-5 justify-between items-center rounded ">
          <div className="flex justify-between items-center w-full">
            <div className="text flex flex-col w-full">
              {todos.length === 0 ? <div className="text-center text-3xl font-bold">No Todo Found</div> : <div className="text-center text-3xl font-bold">Your Todo</div>}
              <hr />
              {todos.map((todo) => {
                return (
                  <div key={todo.id} className="flex items-center w-full justify-between">
                    <div className="flex gap-3">
                      <input name={todo.id} onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} id="" />
                      <div className={todo.isCompleted ? "line-through" : ""}>{todo.todo}</div>
                    </div>

                    <div className="buttons flex">
                      <button onClick={() => handleEdit(todo.id)} className="bg-blue-700 text-white py-1 px-5 m-2 rounded">Edit</button>
                      <button onClick={(e) => handleDelete(e, todo.id)} className="bg-red-700 text-white py-1 px-5 m-2 rounded">Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default App

