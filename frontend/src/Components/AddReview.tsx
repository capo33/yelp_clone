import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import RestaurantFinder from "../Apis/baseUrl";
import { RestaurantsContext } from "../Context/RestaurantsContext";

const AddReview = () => {
  const [name, setName] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<string>("Rating");

  const { addReview } = useContext(RestaurantsContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      // we need to add the review to the state
      addReview(id, { name, review: reviewText, rating });

      setName("");
      setReviewText("");
      setRating("Rating");

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mb-2'>
      <form onSubmit={handleSubmitReview}>
        <div className='row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              placeholder='your name'
              className='form-control'
              type='text'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              id='rating'
              className='form-select mb-sm-3'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='review'>Review</label>
            <textarea
              id='review'
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className='form-control'
            ></textarea>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary my-3'>
              Add Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
