import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductForm.css';



const ProductForm = (props) => {

    
    const { initialTitle, initialPrice,initialDescription, requestPostorPatch, errors, errors2, clearForm } = props;
    const [title, setTitle] = useState(initialTitle); 
    const [price, setPrice] = useState(initialPrice);
    const [description, setDescription] = useState(initialDescription);

  
    const onSubmitHandler =  async(e) => {
         
        e.preventDefault();
        requestPostorPatch({ title, price, description}, setTitle, setPrice, setDescription);

        console.log("errors",errors);
        console.log("errors2",errors2);
    }
    

    return (
        <div className="ProductForm">
           <h1>Product Manager</h1>
           {errors.map((err, index) => (
                    <p style={{color:"red"}} key={index}>{err}</p>
                ))
            }
          <form onSubmit={onSubmitHandler}>
             <div className='field'>
                 <label>title :</label><br/>
                 <input type="text" value={title} onChange = {(e)=>setTitle(e.target.value)}/>
                 { errors2.title ? 
                        <p style={{color:"red"}}>{errors2.title.message}</p>
                        : null
                 }
             </div>
             <div className='field'>
                 <label>price :</label><br/>
                 <input type="number" value={price} onChange = {(e)=>setPrice(e.target.value)}/>
                 { errors2.price ? 
                        <p style={{color:"red"}}>{errors2.price.message}</p>
                        : null
                 }
             </div>
             <div className='field'>
                 <label>description :</label><br/>
                 <textarea name="" id="" cols="2" rows="2" value={description} onChange = {(e)=>setDescription(e.target.value)}></textarea>
                 { errors2.description ? 
                        <p style={{color:"red"}}>{errors2.description.message}</p>
                        : null
                }
             </div>
             <input value="submit"  type="submit"/>
          </form>
        </div>
     )
};
  
ProductForm.propTypes = {};

ProductForm.defaultProps = {};

export default ProductForm;
