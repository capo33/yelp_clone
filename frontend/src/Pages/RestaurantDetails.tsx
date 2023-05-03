import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import AddReview from "../Components/AddReview";
import RestaurantFinder from "../Apis/baseUrl";
import { RestaurantsContext } from "../Context/RestaurantsContext";
import StarRating from "../Components/StarRating";
import RestaurantReviews from "../Components/RestaurantReviews";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);

        // setSelectedRestaurant(response.data.data.restaurant); we no longer need this because we need to have the reviews as well
        console.log('response.data.data', response.data.data);
        
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='text-center display-1'>
            {selectedRestaurant.restaurant?.name}
          </h1>
          <div className='text-center'>
            Average rating &nbsp;
            <StarRating
              rating={selectedRestaurant.restaurant?.average_rating}
            />
            <span className='m-1'>
              (
              {selectedRestaurant.restaurant?.count
                ? selectedRestaurant.restaurant?.count
                : 0}
              )
            </span>
          </div>
          <Link to='/'>Back</Link>
          <div className='mt-3'>
            {!selectedRestaurant?.reviews?.length && <h1>No Reviews Yet</h1>}
            <RestaurantReviews reviews={selectedRestaurant.reviews} />
            <AddReview />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
