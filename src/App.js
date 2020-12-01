import "./App.css";
import axios from "axios";
import { Header } from "./components/Header";

function App() {
  const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;

  const getData = async () => {
    try {
      const d = await axios.get(`${REACT_APP_API_URL}/categories/12/recipes`, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      });
      console.log(d.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  getData();
  return (
    <>
      <div className="App">
        <Header />

        <div className="bg-gray-100 flex"></div>
      </div>
    </>
  );
}

export default App;
