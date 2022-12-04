import React from "react";
import axios from 'axios';
import { useState } from 'react';

const url = "http://localhost:3000/api/task";

// components

const CardAdd = ({tasks, setTaskList}) => {
	const [task, setTask] = useState({ title: "", point: "", status: "wip" });

    const handleChange = ({ currentTarget: input}) => {
        input.value === ""
            ? setTask({ title: "" })
            : setTask((prev) => ({ ...prev, title: input.value}));
    }

    const handleChangePoint = ({ currentTarget: input}) => {
        input.value === ""
            ? setTask({ point: "" })
            : setTask((prev) => ({ ...prev, point: input.value}));
    }

	const addTask = async (e) => {
		e.preventDefault();
		try {
			if (task._id) {
				const { data } = await axios.put(url + "/" + task._id, { title: task.title, point: task.point });
				const originalTasks = [...tasks];
				const index = originalTasks.findIndex((t) => t.id === task._id);
				originalTasks[index] = data.data;
				setTaskList(originalTasks);
				setTask({ title: "", point: "", status: "wip" });
				console.log(data.message);
			} else {
				const { data } = await axios.post(url, task);
				setTaskList((prev) => [...prev, data.data]);
				setTask({ title: "", point: "", status: "wip" });
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Add New Item</h6>
                    </div>
                </div>
                <div className="px-6">
                    <form  onSubmit={addTask}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Control Name
                                    </label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="ex. SDLC Control"
                                        value={task.title}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Point
                                    </label>
                                    <input
                                        type="number"
                                        onChange={handleChangePoint}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={task.point}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <button 
                                        className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 hover:bg-blueGray-500 hover:text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                                        type="submit"
                                    >
                                        <i className="fas fa-paper-plane"></i> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CardAdd;
