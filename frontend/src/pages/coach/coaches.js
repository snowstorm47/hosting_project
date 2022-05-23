import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Dialog from "../../components/dialog";
import Modal from "../../components/modal";
import { fetchCoaches, resetCoaches } from "../../store/coach/actions";
import { baseURL } from "../../utils/axios";

const Coaches = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [education, setEducation] = useState("");
  const {
    loading: coachesLoading,
    data: coaches,
    error: coachesError,
  } = useSelector((state) => state.fetchCoaches);
  useEffect(() => {
    dispatch(fetchCoaches(education));
  }, [education]);
  return (
    <div>
      <Modal open={coachesError}>
        <Dialog
          severity="failure"
          message="adding coach failed !"
          close={() => dispatch(resetCoaches())}
        />
      </Modal>
      <Modal open={coachesLoading}>
        <div className="bg-black bg-opacity-40 h-screen w-screen absolute flex items-center justify-center z-40">
          <PulseLoader color="white" />
        </div>
      </Modal>
      <div className="p-7 space-y-4">
        <div className="flex justify-end">
          <button
            className="px-2 py-1 bg-blue-900 text-white rounded-md space-x-2 flex items-center"
            onClick={() => navigate("/admin/coaches/new")}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span> add coach</span>
          </button>
        </div>

        <div className="bg-white p-7">
          <div className="my-2">
            <div className="px-2 py-1 border rounded-lg flex space-x-2 w-fit">
              <span>education</span>
              <select
                className="border-0 outline-none bg-white"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="">all</option>
                <option value="secondary school">secondary school</option>
                <option value="diploma">diploma</option>
                <option value="degree">degree</option>
                <option value="masters">masters</option>
                <option value="phd">phd</option>
              </select>
            </div>
          </div>
          <table className="w-full border border-collapse p-2">
            <thead>
              <tr>
                <td></td>
                <td className="font-semibold capitalize py-1">first name</td>
                <td className="font-semibold capitalize py-1">middle name</td>
                <td className="font-semibold capitalize py-1">last name</td>
                <td className="font-semibold capitalize py-1">gender</td>
              </tr>
            </thead>
            <tbody className="text-sm">
              {coaches.map((coach) => {
                return (
                  <tr
                    className="border hover:bg-slate-50 hover:cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/coaches/${coach.id}/detail`)
                    }
                  >
                    <td className="p">
                      <div className="flex items-center justify-center">
                        <img
                          className="h-14 w-14 rounded-full object-cover"
                          src={`${baseURL}/images/${coach.photo}`}
                        />
                      </div>
                    </td>
                    <td>{coach.first_name}</td>
                    <td>{coach.middle_name}</td>
                    <td>{coach.last_name}</td>
                    <td>{coach.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coaches;
