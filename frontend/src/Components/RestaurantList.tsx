import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../Apis/baseUrl";
import { RestaurantsContext } from "../Context/RestaurantsContext";
import { IRestaurants } from "../Interfaces/restaurantInterface";
import StarRating from "./StarRating";

export const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await RestaurantFinder.get("/");

        console.log(response.data.data.restaurants);
        setRestaurants(response.data.data.restaurants); // this is the original code
        // setRestaurants(response.data.data.restaurantsWithRatingData);
      } catch (err) {
        console.log(err);
      }
    };

    getRestaurants();
  }, [setRestaurants]);

  // delete restaurant
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      console.log(response);
      setRestaurants(
        restaurants.filter((restaurant: IRestaurants) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // price rating
  // const handleRating = (rating: number) => {
  //   switch (rating) {
  //     case 1:
  //       return "$";
  //     case 2:
  //       return "$$";
  //     case 3:
  //       return "$$$";
  //     case 4:
  //       return "$$$$";
  //     case 5:
  //       return "$$$$$";
  //     default:
  //       return "$";
  //   }
  // };

  // Price Rating 2
  const price_rating = (price_range: number) => {
    return "$".repeat(price_range);
  };

  // Render Rating
  const renderRating = (restaurant: IRestaurants) => {
    if (!restaurant.count) {
      return <span className='text-danger'>0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant?.id} />
        <span className='m-1'>({restaurant?.count})</span>
      </>
    );
  };

  // Update Restaurant
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  // Select Restaurant
  const handleRestaurantSelect = (e: React.MouseEvent, id: number) => {
    navigate(`/restaurants/${id}`);
  };
  return (
    <div className='list-group'>
      <table className='table table-hover text-center'>
        <thead>
          <tr className='bg-dark text-white'>
            <th>Restaurant</th>
            <th>Location</th>
            <th>Price Range</th>
            <th>Rating</th>
            <th>Edit</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants?.map((restaurant) => {
              return (
                <tr key={restaurant?.id}>
                  <td>{restaurant?.name}</td>
                  <td>{restaurant?.location}</td>
                  <td> {price_rating(restaurant?.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleRestaurantSelect(e, restaurant.id)}
                      className='btn btn-info btn-sm'
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className='btn btn-warning btn-sm'
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    {restaurant?.count > 0 ? (
                      <div title='restaurant with reviews cannot be deleted'>
                        <button
                          onClick={(e) => {
                            handleDelete(e, restaurant.id);
                          }}
                          className='btn btn-danger btn-sm'
                          disabled
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          handleDelete(e, restaurant.id);
                        }}
                        className='btn btn-danger btn-sm'
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
