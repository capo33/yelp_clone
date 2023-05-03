import React from "react";
import Header from "../Components/Header";
import { RestaurantList } from "../Components/RestaurantList";
import AddRestaurant from "../Components/AddRestaurant";

const Home = () => {
  return (
    <>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </>
  );
};

export default Home;
