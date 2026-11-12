import React, { useContext, useEffect } from "react";
import axios from "axios";
import { MyStore } from "../context/MyContext";
import ProductsCard from "../components/ProductsCard";

const Home = () => {
  let { productsData, setProductsData } = useContext(MyStore);

  let getProductsData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setProductsData(res.data);
    } catch (error) {
      console.log("error in api", error);
    }
  };
  getProductsData();

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5">
      {productsData.map((val) => {
        return <ProductsCard key={val.id} product={val} />;
      })}
    </div>
  );
};

export default Home;
