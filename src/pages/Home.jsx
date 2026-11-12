import React, { useContext } from "react";
import axios from "axios";
import { MyStore } from "../context/MyContext";

const Home = () => {
  let { getProductsData, setProductsData } = useContext(MyStore);

  let getProductsData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      console.log(res);
    } catch (error) {
      console.log("error in api", error);
    }
  };
  getProductsData();
  return <div>Home Page</div>;
};

export default Home;
