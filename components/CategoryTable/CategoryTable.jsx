//Thired party npm
import { useState, useEffect } from "react";
import axios from "axios";
import * as FontAwesome from "react-icons/fa";

//Css
import "./CategoryTable.css";

function CategoryTable() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(null);
  const [isFetchData, setIsFetchData] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(import.meta.env.VITE_GET_CATEGORY_API, {
        deviceType: "web",
        username: "anvar",
      });
      setCategoryData(
        data?.message.map((val) => ({
          name: val.MAIN_CAT_NAME,
          id: val.MAIN_CAT_ID,
        }))
      );
    })();
  }, [isFetchData]);

  const handleAddCategory = async () => {
    if (!categoryName) return;

    const { data } = await axios.post(import.meta.env.VITE_ADD_CATEGORY_API, {
      deviceType: "web",
      username: "anvar",
      cat_name: categoryName,
    });
    setCategoryName("");
    setIsFetchData(!isFetchData);
    if (data?.status != "success") {
      alert(data.message || "Oops, some thing went wrong");
      return;
    }

    alert(data.message);
  };

  const handleUpdateCategory = ({ id, categoryName }) => {
    setUpdateCategory({ id, categoryName });
    setCategoryName(categoryName);
  };

  const handleUpdateRequest = async () => {
    if (!categoryName) return;
    const { data } = await axios.post(
      import.meta.env.VITE_UPDATE_CATEGORY_API,
      {
        deviceType: "web",
        username: "anvar",
        cat_name: categoryName,
        main_cat_id: updateCategory.id,
        deleted_flg: "U",
      }
    );

    setIsFetchData(!isFetchData);
    setUpdateCategory(null);
    setCategoryName("");
  };

  const handleDeletCategory = async ({ id, name }) => {
    const { data } = await axios.post(
      import.meta.env.VITE_UPDATE_CATEGORY_API,
      {
        deviceType: "web",
        username: "anvar",
        update_main_category: name,
        main_cat_id: id,
        deleted_flg: "D",
      }
    );
    setIsFetchData(!isFetchData);
  };

  return (
    <div className="table_container">
      <h4 className="table_header">
        {updateCategory ? "Update" : "Add"} Main Category
      </h4>
      <div className="table_input_container">
        <input
          type="text"
          className="table_input"
          value={categoryName}
          onChange={(e) => setCategoryName(e?.target?.value)}
        />
        {updateCategory ? (
          <>
            <svg
              onClick={handleUpdateRequest}
              className="update_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#18582d"
                d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
              />
            </svg>
            <svg
              className="update_icon close"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              onClick={() => {
                setUpdateCategory(null);
                setCategoryName("");
              }}
            >
              <path
                fill="#97181d"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </>
        ) : (
          <FontAwesome.FaPlusCircle
            className="plus_circle"
            onClick={handleAddCategory}
          />
        )}
      </div>
      <table>
        <thead>
          <td>Main Category Name</td>
          <td>Action</td>
        </thead>
        <tbody>
          {categoryData?.length > 0 &&
            categoryData.map((cateValue, index) => {
              return (
                <tr
                  key={index}
                  className={
                    updateCategory?.id == cateValue?.id ? "active" : ""
                  }
                >
                  <td>{cateValue.name}</td>
                  <td>
                    <span className="action_section">
                      <FontAwesome.FaPencilAlt
                        className="pencil"
                        onClick={() =>
                          handleUpdateCategory({
                            id: cateValue?.id,
                            categoryName: cateValue?.name,
                          })
                        }
                      />
                    </span>
                    <span className="action_section">
                      <FontAwesome.FaTrashAlt
                        className="trash"
                        onClick={() =>
                          handleDeletCategory({
                            id: cateValue.id,
                            name: cateValue.name,
                          })
                        }
                      />
                    </span>
                    <span className="action_section">
                      <FontAwesome.FaPlusCircle className="circle" />
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
