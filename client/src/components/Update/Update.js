import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Update.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../ProductForm/ProductForm';
import DeleteButton from '../DeleteButton/DeleteButton';




const Update = (props) => {

    const { id } = useParams();
    const [prodObj, setProdObj] = useState({});
    const [loaded, setLoaded] = useState(false); // verifie quand si ls donnees st recupereés et disponibles
    const navigate = useNavigate();
    
    //Create an array to store errors from the API // 1ere methode
    const [errors, setErrors] = useState([]); 

  //Create an array to store errors from the API // 2e methode
    const [errors2, setErrors2] = useState({}); 
  
  
    //get  data one specific product
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/products/" + id)
        .then((res) => {
          setProdObj(res.data.product);
          setLoaded(true); // données dispo on set en "true"
        })
        .catch((err) => console.log(err));
    }, [id]); // bof
  
  
  
    // update one specific product
    const updateProduct = (prodObj) => {
      axios
        .patch(
          "http://localhost:8000/api/products/" + id,
  
          prodObj 
        )
        .then((res) => {
         // console.log(res.data.product);
          //navigate("/home");
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
      <div className="Update">
        <h1>Update a Product</h1>
        {loaded === true ? 
          <ProductForm requestPostorPatch={updateProduct} initialTitle={prodObj.title} 
          initialPrice={prodObj.price} initialDescription={prodObj.description}
          errors={errors}
          errors2={errors2} />
         : null}
        <DeleteButton productId={prodObj._id} successCallback={() => navigate("/")} />
        
        <Link to="/">
          Return Home Page!
        </Link>
      </div>
    );

};

Update.propTypes = {};

Update.defaultProps = {};

export default Update;
