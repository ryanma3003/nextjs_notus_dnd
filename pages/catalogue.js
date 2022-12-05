import { useState, React } from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import CardAdd from "components/Cards/CardAdd.js";
import CardStats from "components/Cards/CardStats.js";
import axios from 'axios';

// layout for page

import Admin from "layouts/Admin.js";

// const url = "http://localhost:3000/api/task";
const url = "https://cybersecuritycontrol.vercel.app/api/task";

export default function Catalogue(props) {
  const [tasks, setTaskList] = useState(props.tasks);
  console.log(tasks);
	const total_point = tasks.filter((task, i) => task.status === 'done').reduce((accum, item) => accum + item.point, 0);
	const total_choosen = tasks.filter((task, i) => task.status === 'done').length;
  const total_item = tasks.length;
  // console.log(tasks, setTaskList);

  return (
    <>

      {/* Card stats */}
      <div className="flex flex-wrap mb-3">
        <div className="w-full flex-1 xl:w-4/12 px-4">
          <CardStats
            statSubtitle="Total Items"
            statTitle={total_item}
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-8/12 xl:w-8/12 px-4">
          <CardStats
            statSubtitle="Total Choosen Point"
            statTitle={total_point}
            statIconName="fas fa-chart-pie"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="w-full flex-1 xl:w-4/12 px-4">
          <CardStats
            statSubtitle="Total Choosen"
            statTitle={total_choosen}
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1 px-4">
          <CardAdd tasks={tasks} setTaskList={setTaskList} />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1 px-4">
          <CardProfile tasks={tasks} setTaskList={setTaskList} />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1 px-4">
          <CardSettings tasks={tasks} setTaskList={setTaskList} />
        </div>
      </div>
    </>
  );
}

Catalogue.layout = Admin;

export const getServerSideProps = async () => {
  const { data } = await axios.get(url);
  return {
    props: {
      tasks: JSON.parse(JSON.stringify(data.data)),
    },
  };
}
