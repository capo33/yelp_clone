import axios from "axios";

// NODE_ENV = "production" or "development"

// if we are in production baseURl = "/api/v1/restaurants"
// else baseURl = "http://localhost:8080/api/v1/restaurants"

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/restaurants"
    : "http://localhost:8080/api/v1/restaurants";

export default axios.create({
  baseURL,
});
