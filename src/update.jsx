import React, { useEffect } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import './App.css';

function Update({ users, handleAddUser, handleUpdateUser }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (id !== "new") {
      const user = users.find(user => user.customId === parseInt(id));
      if (user) {
        reset({ name: user.name, city: user.address.city });
      }
    } else {
      reset({ name: "", city: "" });
    }
  }, [id, reset, users]);

  const onSubmit = (data) => {
    if (id !== "new") {
      handleUpdateUser({ customId: parseInt(id), name: data.name, address: { city: data.city } });
      alert("User Updated Successfully");
    } else {
      handleAddUser({ name: data.name, address: { city: data.city } });
      alert("User Added Successfully");
    }
    navigate("/");
  };

  return (
    <div className="container">
      <div className="updateBox">
        <h2 className="text-center">{id !== "new" ? "Update" : "Add"} User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <h5>Name</h5>
            <input
              type="text"
              placeholder="Enter the name"
              {...register("name", { required: "Name is required" })}
              className="form-control custom-search"
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <h5>City</h5>
            <input
              type="text"
              placeholder="Enter the City"
              {...register("city", { required: "City is required" })}
              className="form-control custom-search"
            />
            {errors.city && <p className="text-danger">{errors.city.message}</p>}
          </div>

          <button type="submit" className="btn btn-success">
            {id !== "new" ? "Update" : "Add"} User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
