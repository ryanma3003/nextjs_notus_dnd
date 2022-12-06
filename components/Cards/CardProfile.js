import { useState, createContext, useContext, React } from "react";
import CardItem from "./CardItem.js";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/items';
import axios from 'axios';

// const url = "http://localhost:3000/api/task";
const url = "https://cybersecuritycontrol.vercel.app/api/task";

// components

export default function CardProfile({ tasks, setTaskList }) {
	const [task, setTask] = useState({ title: "", point: "", status: "wip" });

	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item, monitor) => markAsAvailable(item.id),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	});

	const markAsAvailable = async (id) => {
		try {
			const originalTasks = [...tasks];
			const index = originalTasks.findIndex((t) => t._id === id);
			const { data } = await axios.put(url + "/" + id, { status: "wip" });
			originalTasks[index] = data.data;
			setTaskList(originalTasks);
			console.log(data.message);
		} catch (error) {
			console.log(error);
		}
	}

	const deleteTask = async (id) => {
		try {
			const { data } = await axios.delete(url + "/" + id);
			setTaskList((prev) => prev.filter((item) => item._id !== id));
			console.log(data.message);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div ref={drop} className={"relative flex flex-col min-w-0 break-words w-full mb-6 border-0 shadow-xl rounded-lg " + (isOver ? "bg-blueGray-100" : "bg-white")}>
				<div className="rounded-t bg-white mb-0 px-6 py-6">
					<div className="text-center flex justify-between">
						<h6 className="text-blueGray-700 text-xl font-bold">Security Control Catalogue</h6>
					</div>
				</div>
				<div className="px-2 py-10 pt-3">
					<div className="flex flex-wrap justify-center">
						{tasks.filter((task, i) => task.status === 'wip').length === 0 && <h6 className="text-blueGray-700 text-xl font-bold">No Item</h6>}
						{tasks.filter((task, i) => task.status === 'wip').map((task, i) => (
							<div className="w-full flex-1 px-4 mb-3">
								<CardItem
									key={task._id}
									id={task._id}
									point={task.point}
									title={task.title}
								/>

								{/* <button className="bg-red-500 text-white mt-3 text-xs px-2 py-1 rounded shadow outline-none" onClick={() => deleteTask(task._id)}>
									<i className="fas fa-trash"></i> Delete
								</button> */}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
