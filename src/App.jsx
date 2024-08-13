//Thired party npm
import { useState } from "react";
import * as FontAwesome from "react-icons/fa";

//Components
import CategoryTable from "../components/CategoryTable/CategoryTable";

//Css
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="category">
        <div className="header">
          <FontAwesome.FaArrowLeft className="arrow_icon" />
          <h4 className="title">Categories</h4>
        </div>
        <div className="category_table">
          <CategoryTable />
        </div>
      </div>
    </div>
  );
}

export default App;
