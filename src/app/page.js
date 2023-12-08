"use client";
import { useEffect, useState } from "react";

const page = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [editTodoID, setEditTodoID] = useState("");

  useEffect(() => {
    const getTodos = () => {
      setLoading(true);
      fetch("http://localhost:3000/api/todos")
        .then((res) => res.json())
        .then((data) => {
          // console.log("Data--->", data);
          setTodos(data);
          setLoading(false);
        });
    };

    getTodos();
  }, []);

  const handleAddTodoBtn = async (e) => {
    await fetch("http://localhost:3000/api/add-todo", {
      method: "POST",
      body: JSON.stringify({
        title
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("add req res data---->", data);
        setTodos([...todos, data]);
        setTitle("");
      });
  };

  const handleDeleteTodoBtn = async (e, id) => {
    console.log(id);
    await fetch("http://localhost:3000/api/delete-todo", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Handle Delete Todo---->", data);
        let new_todos = todos.filter((item) => item._id !== id)
        // setTodos([...todos, data]);
        setTodos(new_todos);
      });
  }

  const handleEditBtnClick = (e, id) => {
    setEditTodoID(id);
    let todo = todos.find((todo) => todo._id === id)
    setTitle(todo.title);

  }

  const handleUpdateEditTodo = async (e) => {
    await fetch("http://localhost:3000/api/edit-todo", {
      method: "POST",
      body: JSON.stringify({
        id: editTodoID,
        title
      })
    }).then((res) => res.json())
    .then((data) => {
      console.log("Handle Delete Todo---->", data);
      let new_todos = todos.map((item)=>{
        if(item._id === editTodoID ){
          item.title = title;
        }
        return item;
      })
      setTodos(new_todos);
      setTitle("");
      setEditTodoID("");
    })
  }

  return (
    <div className=" w-[95%] md:w-1/3 mx-auto my-10 border p-1 shadow ">
      <div className="text-center  p-2">
        <p className="font-extrabold font-serif text-2xl">
          Next.js MongoDB Full Stack Todo APP
        </p>
      </div>
      <div className="flex items-center p-2 ">
        <input
          type="text"
          name="todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-12 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Add Todo"
        />

        {
          editTodoID ? (
            <button
              type="button"
              onClick={handleUpdateEditTodo}
              className="mx-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2   dark:focus:ring-yellow-900"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddTodoBtn}
              className="mx-1 my-2 py-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5  mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add
            </button>
          )
        }


      </div>
      <div className=" border rounded-lg shadow">
        <div className="text-center p-2">
          <p className="text-2xl">Todo List</p>
        </div>
        <div className="p-2 ">
          {loading === true ? (
            <p>Loading....</p>
          ) : (
            <>
              {todos?.map((todo, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 border m-2 rounded  "
                >
                  <div className=" flex justify-start w-full">
                    <p className="font-semibold  font-serif px-3">{i + 1}</p>
                    <p className="font-semibold font-serif ">{todo.title}</p>
                  </div>
                  <div className=" flex items-center w-full justify-end">
                    <button
                      type="button"
                      onClick={(e) => handleEditBtnClick(e, todo._id)}
                      className="mx-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2   dark:focus:ring-yellow-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteTodoBtn(e, todo._id)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div >
  );
};

export default page;
