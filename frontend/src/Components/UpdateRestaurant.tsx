import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import RestaurantFinder from "../Apis/baseUrl";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    // we need to get a single restaurant
    const getSingleRestaurant = async () => {
      const response = await RestaurantFinder.get(`/${id}`);

      // we add the data we get from database to the state
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };
    getSingleRestaurant();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            className='form-control'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            id='location'
            className='form-control'
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='form-group'>
        <label htmlFor='price_range'>Price Range</label>
          <select
            className='form-select   '
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option disabled>Price Range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>

          {/* <label htmlFor='price_range'>Price Range</label>
          <input
            id='price_range'
            className='form-control'
            type='number'
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          /> */}
        </div>
        <button
          // onClick={handleSubmit}
          className='btn btn-primary mt-3'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;