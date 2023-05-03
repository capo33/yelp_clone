import React, { useContext, useState } from "react";

import RestaurantFinder from "../Apis/baseUrl";
import { RestaurantsContext } from "../Context/RestaurantsContext";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const { addRestaurant } = useContext(RestaurantsContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement >) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
      setName("");
      setLocation("");
      setPriceRange("Price Range");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mb-4'>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <div className='col-4 m-2'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='form-control'
              placeholder='name'
            />
          </div>
          <div className='col-4 m-2'>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type='text'
              className='form-control'
              placeholder='location'
              size={10}
            />
          </div>
          <div className='col-32 m-2'>
            <select
              className='form-select mr-sm-2'
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option selected disabled> Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <div className='col m-2'>
            <button className='btn btn-primary '>Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
