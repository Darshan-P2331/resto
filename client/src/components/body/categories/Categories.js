import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../../utils/Loading";

export default function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState("");
  const [token] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File does not exist.");

      if (file.size > 1024 * 1024) return alert("Size is too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_category", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setImage(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );

      setLoading(false);
      setImage(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category, image },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category, image },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setImage(false);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name, image) => {
    setID(id);
    setCategory(name);
    setImage(image);
    setOnEdit(true);
  };

  const deleteCategory = async (id,image) => {
    try {
      setImage(image)
      handleDestroy()
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  return (
    <section className="categories">
      <div class="heading">
        <h3>Categories</h3>
      </div>
      <form onSubmit={createCategory}>
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <Loading />
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={image ? image.url : ""} alt="" loading="lazy" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>
        <div>
          <div className="inputBox">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
          {onEdit ? "Update":'Create'}
          </button>
        </div>
      </form>
      <div className="box-container">
        {categories.map((item) => (
          <div className="box" key={item._id} >
            <img src={item.image.url} alt="" loading="lazy" />
            <div className="content">
              <h3>{item.name}</h3>
              <i className="fas fa-edit" onClick={() => editCategory(item._id,item.name,item.image)} ></i>
              <i className="fas fa-trash"onClick={() => deleteCategory(item._id,item.image)}></i>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
