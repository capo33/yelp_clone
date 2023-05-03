export interface IRestaurants {
  id: number;
  name: string;
  location: string;
  price_range: number;
  restaurant_id: string;
  count: number;
  average_rating: number;
}

export interface IReviews {
  id?: string;
  name: string;
  review: string;
  rating: string;
}

export interface IRestaurantsContext {
  setRestaurants: (restaurants: IRestaurants[]) => void;
  addRestaurant: (restaurant: IRestaurants) => void;
  setReviews: (reviews: IReviews[]) => void;
  addReview: (id: string | undefined, review: IReviews) => void;
  restaurants: IRestaurants[];
  reviews: IReviews[];
  selectedRestaurant: any;
  setSelectedRestaurant: any;
}