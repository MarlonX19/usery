import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddContactMutation } from '../app/hooks'
import { Contact } from "../app/models";
import "./AddEditUser.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const AddEditUser = () => {
  const [addContact] = useAddContactMutation();

  const [formValue, setFormValue] = useState<Contact>(initialState);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { name, email, phone } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !email && !phone) {
      toast.error("Please provide value into each input field");
    } else {
      if (!editMode) {
        navigate("/");
        addContact(formValue)
        toast.success("Contact Added Successfully");
      } else {
        navigate("/");
        setEditMode(false);
        toast.success("Contact Updated Successfully");
      }
    }
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Your phone No. ..."
          value={phone || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEditUser;
