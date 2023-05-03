import { createContext, useState } from "react";
import {
  IRestaurants,
  IRestaurantsContext,
  IReviews,
} from "../Interfaces/restaurantInterface";

type RestaurantsContextProps = {
  children: React.ReactNode;
};

export const RestaurantsContext = createContext<IRestaurantsContext>({
  restaurants: [],
  setRestaurants: () => {},
  addRestaurant: () => {},
  selectedRestaurant: {},
  setSelectedRestaurant: () => {},
  reviews: [],
  setReviews: () => {},
  addReview: () => {},
});

export const RestaurantsContextProvider = ({
  children,
}: RestaurantsContextProps) => {
  const [restaurants, setRestaurants] = useState<IRestaurants[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [reviews, setReviews] = useState<IReviews[]>([]);

  const addRestaurant = (restaurant: IRestaurants) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const addReview = (id: string | undefined, review: IReviews) => {
    setReviews([...reviews, review]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        selectedRestaurant,
        setSelectedRestaurant,
        reviews,
        setReviews,
        addReview,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
