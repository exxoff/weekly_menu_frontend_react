import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Recipe } from "./Recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTrashAlt,
  faCog,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { Loader } from "./Loader";

export const TodayMenu = ({ date }) => {
  const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;
  const [isLoading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [menuComment, setMenuComment] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const headers = {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  };

  const removeRecipe = async (recipe_id) => {
    let req = undefined;
    try {
      console.log(`Deleting recipe ${recipe_id} from menu ${currentMenu.id}`);
      const payload = {
        headers: headers,
        data: { recipe_id: recipe_id },
      };
      req = await axios.delete(
        `${REACT_APP_API_URL}/menus/${currentMenu.id}/${recipe_id}`,
        headers
      );

      const newRecipes = recipes.filter((obj) => {
        return obj.id !== recipe_id;
      });

      setRecipes(newRecipes);
    } catch (err) {
      console.log(err);
      alert(`Unable to remove recipe from menu. ${err}`);
    }
  };

  useEffect(() => {
    setRecipes([]);
    setMenuComment(null);
    setCurrentMenu(null);
    const fetchData = async () => {
      const menu = await axios.get(
        `${REACT_APP_API_URL}/menus?date=${date.toLocaleDateString()}`,
        headers
      );

      if (menu.data.recipes) {
        setRecipes(menu.data.recipes);
        setMenuComment(menu.data.comment);
      }
      setCurrentMenu(menu.data);
    };
    fetchData();

    setLoading(false);
  }, [date]);

  return (
    <div className="bg-white ml-7 my-3 flex-initial w-auto flex-grow shadow-lg">
      <div className=" bg-purple-700 text-base p-1 text-white flex flex-row ">
        <div>
          <FontAwesomeIcon className="ml-2 mr-4" icon={faCalendarAlt} />
        </div>
        <div className="text-white font-body">{date.toLocaleDateString()}</div>
        <div className="ml-auto">
          <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
          <FontAwesomeIcon icon={faCog} className="mr-2" />
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
        </div>
      </div>

      <div className="bg-opacity-25 shadow-sm bg-purple-500 text-purple-800 flex justify-center items-center font-body">
        {menuComment}
      </div>

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          recipes.map((recipe) => (
            <Recipe remRec={removeRecipe} key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};
