import React from "react";

export default function Home() {
  const [data, setData] = React.useState<any>(null);

  // -----------------FETCH------------------------------------------------------------
  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setData(data); // Update the state with the fetched data
      console.log("Fetch", { data }); // Log the fetched data to the console
    } catch (error) {
      console.log({ error }); // Log any errors that occur during the API request
    }
  };

  // -------------------POST----------------------------------------------------------
  // Function to handle the API POST request

  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");
  const postData = async (title: string, body: string) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST", // Specify the HTTP method as POST
          headers: {
            "Content-Type": "application/json", // Set the request header to indicate JSON content
          },
          body: JSON.stringify({
            // Convert the data to JSON format
            title: title,
            body: body,
            userId: 1,
          }),
        }
      );
      const data = await response.json(); // Parse the response data as JSON
      console.log("Post", { data }); // Log the response data to the console
    } catch (error) {
      console.log("Error:", error); // Log any errors that occur during the API request
    }
  };

  // ----------------------DELETE-------------------------------------------------------
  const [deleteId, setDeleteId] = React.useState<string>("");

  const deleteData = async (id: string) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response.json());
      if (response.ok) {
        console.log("Item deleted successfully");
      } else {
        console.log("Failed to delete item");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <main>
      <button className="btn border rounded-lg p-2 m-5" onClick={fetchData}>
        Fetch
      </button>

      <form className="flex flex-col max-w-lg gap-3 m-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="border p-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter body"
          className="border p-2"
        />
        <button
          type="button"
          className="btn border rounded-lg p-2 m-5"
          onClick={() => postData(title, body)}
        >
          Post
        </button>
      </form>

      <form>
        <input
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="Enter Id"
          className="border p-2"
        />
        <button type="button" onClick={() => deleteData(deleteId)}>
          Delete
        </button>
      </form>
    </main>
  );
}
