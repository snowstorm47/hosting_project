import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Nav from "../../components/nav";
import AddEditCoach from "../coach/add_edit_coach";
import Coaches from "../coach/coaches";
import CoachesDetail from "../coach/coaches_detail";
import AddEditInstructor from "../instructor/add_edit_instructor";
import InstractorDetail from "../instructor/instractor_detail";
import Instractors from "../instructor/instuctors";

const AdminHome = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="grid grid-cols-5 min-h-screen h-screen overflow-hidden">
      <div className="bg-blue-900">
        <Nav />
      </div>
      <div className="overflow-y-scroll  col-span-4 bg-gray-100">
        <div className="h-14 bg-white flex justify-end items-center ">
          <div className="group bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center mr-8 relative">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <div className="absolute hidden group-hover:block bg-white rounded-md top-12 p-2 drop-shadow-lg">
              <button className="flex space-x-2 p-2" onClick={logout}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <span>logout</span>
              </button>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="coaches" element={<Coaches />} />
          <Route path="coaches/new" element={<AddEditCoach />} />
          <Route path="coaches/:id/detail" element={<CoachesDetail />} />
          <Route path="instructors/new" element={<AddEditInstructor />} />
          <Route path="instructors" element={<Instractors/>} />
          <Route path="instructors/:id/detail" element={<InstractorDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHome;
