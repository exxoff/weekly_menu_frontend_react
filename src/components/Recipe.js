import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faExternalLinkAlt,
  faTrashAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export const Recipe = ({ recipe, remRec }) => {
  if (!recipe) {
    return <div>No</div>;
  }
  console.log("FFF", recipe);
  const hasLink = recipe.comment ? false : true;
  const mt = !recipe.comment ? 3 : 2;

  const onLinkClickHandler = () => {
    if (!hasLink) {
      return;
    }
    window.open(recipe.link, "_blank");
  };

  const onTrashClickHandler = () => {
    //TODO: Replace with nicer dialog box
    if (window.confirm("Are you sure you wish to delete this item?")) {
      remRec(recipe.id);
    }
  };
  return (
    <div className="flex flex-row mt-3 ml-3">
      <div className="flex justify-center items-center">
        {!recipe.image_url ? (
          <div className="w-12 h-12 rounded-full flex m-2 bg-purple-600 text-2xl  text-white font-bold font-body justify-center items-center">
            {recipe.name.charAt(0)}
          </div>
        ) : (
          <img
            src={recipe.image_url}
            className="w-12 h-12 rounded-full m-2"
            alt="Recipe pic"
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className={`text-lg font-semibold font-body mx-2 mt-${mt}`}>
          {recipe.name}
        </div>
        <div className="text-sm text-gray-600 font-body mx-2 mt-0">
          {recipe.comment ?? ""}
        </div>
      </div>
      <FontAwesomeIcon
        className={`mx-2 mt-${mt + 1} ${
          hasLink ? "text-purple-700" : "text-gray-400"
        } `}
        icon={faExternalLinkAlt}
        cursor={hasLink ? "pointer" : "arrow"}
        onClick={onLinkClickHandler}
      />
      <FontAwesomeIcon className={`mx-2 mt-${mt + 1}`} icon={faCog} />
      <FontAwesomeIcon
        className={`ml-2 mr-4 mt-${mt + 1} text-red-700`}
        icon={faTrashAlt}
        onClick={onTrashClickHandler}
        cursor="pointer"
      />
    </div>
  );
};
