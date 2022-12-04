import { useState, createContext, useContext, React } from "react";
import CardItem from "./CardItem.js";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/items';
import axios from 'axios';

// components

const url = "http://localhost:3000/api/task";

export default function CardSettings({ tasks, setTaskList }) {
  const [task, setTask] = useState({ title: "", point: "", status: "done" });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => markAsDone(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const markAsDone = async (id) => {
    try {
      const originalTasks = [...tasks];
      const index = originalTasks.findIndex((t) => t._id === id);
      const { data } = await axios.put(url + "/" + id, { status: "done" });
      originalTasks[index] = data.data;
      setTaskList(originalTasks);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div ref={drop} className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 " + (isOver ? "bg-blueGray-200" : "bg-blueGray-100")}>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Choosen Items</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-3">
          <div className="flex flex-wrap justify-center">
            {tasks.filter((task, i) => task.status === 'done').length === 0 && <h6 className="text-blueGray-700 text-xl font-bold">No Item</h6>}
            {tasks.filter((task, i) => task.status === 'done').map((task, i) => (
              <div className="w-full lg:w-1 xl:w-1 px-4 mb-3">
                <CardItem
                  key={task._id}
                  id={task._id}
                  point={task.point}
                  title={task.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
