/**
 * @author Sandeep Dangol
 * @title API CRUD
 * @description Learning CRUD, axios
 */
import React from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

const AxiosApi = () => {
  const [data, setData] = React.useState<Array<Post>>([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Delete

  const [deleteId, setDeleteId] = React.useState<string>("");
  const [deleteStatus, setDeleteStatus] = React.useState<boolean>();

  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (response.status === 200) {
        console.log("Item deleted successfully");
        setDeleteStatus(true);
      } else {
        console.log("Failed to delete item");
        setDeleteStatus(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Post
  const [postInfo, setPostInfo] = React.useState<any>([]);

  const postData = async (dataPost: any) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        dataPost
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const [body, setBody] = React.useState("");
  const [title, setTitle] = React.useState("");

  // Handle submit for post
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      title: title,
      body: body,
    };

    await postData(data);

    // Reset the form fields
    setTitle("");
    setBody("");
  };

  return (
    <div className="p-4">
      <div className=" border border-slate-700 mb-3 p-2 max-w-lg">
        {/* GET */}
        <button type="button" className="border p-2 mb-2" onClick={getData}>
          Get
        </button>
        <div className="max-h-60 overflow-auto border p-2">
          data:
          <table className="">
            {data.map((item: Post) => (
              <tr key={item.id}>
                <td>{item?.id}</td>
                <td>{item?.title}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>

      {/* Delete */}
      <div className=" border border-slate-700 mb-3 p-2 flex flex-col gap-2 max-w-lg">
        <label>Id:</label>
        <input
          type="text"
          className="border"
          onChange={(e) => setDeleteId(e.target.value)}
          value={deleteId}
        />
        <button
          type="button"
          className="border p-2 "
          onClick={() => deleteData(deleteId)}
        >
          Delete
        </button>
        <p className="text-green-600">
          {deleteId === ""
            ? ""
            : deleteStatus
            ? `Item deleted, id:${deleteId}`
            : `Item not deleted, id:${deleteId}`}
        </p>
      </div>

      {/* Post */}
      <div className=" border border-slate-700 mb-3 p-2 flex flex-col gap-2 max-w-lg">
        <form onSubmit={handleSubmit}>
          <button className="border p-3" type="submit">
            Post
          </button>

          <div className="w-full">
            <label htmlFor="title">Title:</label>
            <input
              className="border w-full"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="body">Body:</label>
            <textarea
              className="border w-full"
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AxiosApi;
