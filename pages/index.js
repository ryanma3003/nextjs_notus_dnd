import React from "react";

// components

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  return (
    <>
      <div className="relative flex flex-wrap">
        <div className="w-full xl:w-1 mb-12 xl:mb-0 px-4">
          <img 
            alt="bg-dashboard"
            src="/img/bg-dashboard.jpg"
            className="shadow-lg mx-auto"
          />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
