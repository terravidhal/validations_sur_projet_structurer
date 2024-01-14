import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Main.css";
import axios from "axios";
import ProductForm from "../../components/ProductForm/ProductForm";
import ProductList from "../../components/ProductList/ProductList";







const Main = () => {
  const [allProducts, setAllProducts] = useState([]);

  //Create an array to store errors from the API // 1ere methode
  const [errors, setErrors] = useState([]); 

  //Create an array to store errors from the API // 2e methode
  const [errors2, setErrors2] = useState({}); 

  
 

  
  // get all products
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => setAllProducts(res.data.products))
      .catch((err) => console.log(err));
  }, [allProducts]); // important!



  // delete One specific product
  const deleteProduct = (productId) => {
    axios
      .delete("http://localhost:8000/api/products/" + productId)
      .then((res) => {
        console.log(res.data.result);
        //setAllProducts(allProducts.filter(product=> product._id !== productId)); // pas necessaire
      })
      .catch((err) => console.log(err));
  };


  // create one product
  const createProduct = (prodObj) => {
    axios
      .post(
        "http://localhost:8000/api/products", prodObj 
      )
      .then((res) => {
        console.log(res.data.product);
        // on vide les erreurs si on entr dns ce cas
        setErrors([]);
        setErrors2({});
       // setAllProducts([...allProducts, res.data.product]); // pas necessaire
      })
      .catch(err=>{
        console.log("err//////", err)
        const errorResponse = err.response.data.errors; // / Récupère les erreurs de err.response.data
        // Set Errors
        setErrors2(errorResponse);
        const errorArr = []; 
        for (const key of Object.keys(errorResponse)) { // // Parcourez toutes les erreurs et récupérez les messages 
            errorArr.push(errorResponse[key].message) // on ajout chaq erreur dns une clé "message"
        }
        // Set Errors
        setErrors(errorArr);
      }) 
  };

  return (
    <div className="Main">
      <ProductForm
        requestPostorPatch={createProduct}
        initialTitle=""
        initialPrice=""
        initialDescription=""
        errors={errors}
        errors2={errors2}
      />

      <ProductList allProducts={allProducts} deleteProduct={deleteProduct} />
    </div>
  );

};

Main.propTypes = {};

Main.defaultProps = {};

export default Main;