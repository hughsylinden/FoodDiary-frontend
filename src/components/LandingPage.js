/* eslint-disable react/jsx-no-bind */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import { UserContext } from "../contexts/UserContext";
import { addFoodDiary, getFoodDiaryByUser } from "../utils/FoodDiary";
import "../styles/LandingPage.css";
import DiaryInputs from "./inputs/DiaryInputs";

function LandingPage() {
  const { user } = useContext(UserContext);
  const initialState = {
    fields: { username: "", password: "", name: "", dailyCalorieTarget: "" },
  };
  const [fields, setFields] = useState(initialState.fields);
  const [foodDiary, setFoodDiary] = useState([]);
  const [showDiaryInputs, setShowDiaryInputs] = useState(false);

  useEffect(() => {
    getFoodDiaryByUser(user.id).then((res) => {
      setFoodDiary(res);
    });
  }, [user]);

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  async function viewNewDiaryInputs() {
    setShowDiaryInputs(!showDiaryInputs);
  }

  async function handleAddFoodDiary(e) {
    const fd = foodDiary;
    await addFoodDiary(fields.name, fields.dailyCalorieTarget, user.id).then(
      (res) => {
        fd.push(res);
        setFoodDiary(fd);
      }
    );
    e.target.previousSibling.value = "";
    setFields({ ...fields, name: "" });
  }

  return (
    <div className="landing-page">
      {user.username ? (
        <>
          <div className="landing-page__title">
            <p>
              {user.username[0].toUpperCase() +
                user.username.slice(1).toLowerCase()}
              &apos;s <br /> Food Diaries{" "}
            </p>
          </div>
          <div className="landing-page__diaries">
            {showDiaryInputs && (
              <DiaryInputs
                handleFieldChange={handleFieldChange}
                handleAddFoodDiary={handleAddFoodDiary}
              />
            )}

            {!showDiaryInputs && (
              <div className="landing-page__links">
                {foodDiary.map((fd) => (
                  <Link
                    to={`/FoodDiary/${fd.id}`}
                    type="button"
                    id={fd.id}
                    key={fd.id}
                  >
                    {fd.name}
                    <br />
                  </Link>
                ))}
              </div>
            )}

            <button
              className="primary-button "
              type="submit"
              onClick={viewNewDiaryInputs}
            >
              {showDiaryInputs ? <>Cancel</> : <>New Diary</>}
            </button>
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default LandingPage;
