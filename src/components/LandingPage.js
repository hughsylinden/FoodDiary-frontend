import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import { UserContext } from "../contexts/UserContext";
import { addFoodDiary, getFoodDiaryByUser } from "../utils/FoodDiary";

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
    <div>
      {user.username ? (
        <div>
          <h1>{user.username}s Food Diaries </h1>
          {showDiaryInputs && (
            <div>
              diary name
              <input type="text" name="name" onChange={handleFieldChange} />
              <br />
              daily calorie target
              <input
                type="text"
                name="dailyCalorieTarget"
                onChange={handleFieldChange}
              />
              <button type="submit" onClick={handleAddFoodDiary}>
                add
              </button>
              <br />
            </div>
          )}

          <button type="submit" onClick={viewNewDiaryInputs}>
            create new food diary
          </button>
          <br />
          <br />
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
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default LandingPage;
