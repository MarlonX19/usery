import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import { useContactsQuery, useDeleteContactMutation } from "../app/hooks";
import { Contact } from "../app/models";

const Home = () => {
  const { data, error, isLoading, isSuccess , isFetching } = useContactsQuery();
  const [deleteContact, status ] = useDeleteContactMutation();
  const { isSuccess: deletedContact } = status;

  console.log('===isFetching', isFetching)

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      deleteContact(id);
    }
  };

  useEffect(() => {
    if(deletedContact) {
      toast.success("Contact Deleted Successfully");
    }
  },[deletedContact])

  if(isLoading) {
    return (
      <div className="loading-container">
        <div className="info-container">
          <h1>Loading users' information...</h1>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Redux Toolkit RTK Query CRUD with React and JSON Server </h2>
      <Link to="/add">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: Contact, index: any) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
