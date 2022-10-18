import { useState } from "react";

export const SearchForm = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };

  return (
    <div className="ml-3 mt-3 mr-5">
      <form>
        <label>
          Namn:
          <input
            className="border-gray-500"
            type="text"
            name="searchText"
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
};
