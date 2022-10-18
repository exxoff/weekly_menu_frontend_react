import { useState, useEffect } from "react";
import axios from "axios";

import { Recipe } from "./Recipe";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCalendarAlt,
//   faTrashAlt,
//   faCog,
//   faCommentDots,
// } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "./Loader";
// import { SearchForm } from "./SearchForm";

export const Search = () => {
  const {
    REACT_APP_API_URL,
    REACT_APP_API_KEY,
    REACT_APP_STYLE_CHKBOX_SEARCH,
  } = process.env;
  const [isLoading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const headers = {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  };

  useEffect(() => {
    setLoading(true);
    setRecipes([]);
    const fetchData = async () => {
      const menu = await axios.get(
        `${REACT_APP_API_URL}/recipes?name=${searchText}&cat=${selectedCategories}`,
        headers
      );
      console.log(menu.data);
      if (menu.data) {
        setRecipes(menu.data);
      }
    };
    fetchData();

    setLoading(false);
  }, [searchText, selectedCategories]);

  useEffect(() => {
    setCategories([]);
    const fetchData = async () => {
      const cats = await axios.get(`${REACT_APP_API_URL}/categories`, headers);
      console.log("CATEGORIES:", cats.data);
      if (cats.data) {
        setCategories(cats.data);
      }
    };
    fetchData();
  }, []); // Run once

  const handleChange = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };

  const handleChecked = (event) => {
    var updatedList = [...selectedCategories];
    if (event.target.checked) {
      updatedList = [...selectedCategories, event.target.value];
    } else {
      updatedList.splice(selectedCategories.indexOf(event.target.value), 1);
    }
    setSelectedCategories(updatedList);
  };
  return (
    <>
      <div className="ml-3 mt-3 mr-5">
        <div>
          <form>
            <div>
              <label />
              Namn:
              <input
                className="border-gray-500 border-opacity-95 bg-blue-100 m-3"
                type="text"
                name="searchText"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label>Kategorier:</label>
            </div>
            {categories.map((category) => (
              <span key={category.id}>
                <input
                  value={category.id}
                  type="checkbox"
                  onChange={handleChecked}
                />
                <span className={REACT_APP_STYLE_CHKBOX_SEARCH}>
                  {category.name}
                </span>
              </span>
            ))}
          </form>
        </div>

        <div>
          {isLoading ? (
            <Loader />
          ) : (
            recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)
          )}
        </div>
      </div>
    </>
  );
};
