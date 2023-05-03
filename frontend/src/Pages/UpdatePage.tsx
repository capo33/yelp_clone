import React from "react";
import { Link } from "react-router-dom";
import UpdateRestaurant from "../Components/UpdateRestaurant";

const UpdataPage = () => {
  return (
    <div>
      <h1 className='text-center display-1'>Update Restaurant</h1>
      <Link to='/'>Back</Link>
      <div className='mt-3'>
        <UpdateRestaurant />
      </div>
    </div>
  );
};

export default UpdataPage;
