import React, { useEffect } from 'react'
import { getRestaurants } from '../../action/restaurantAction'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';

export default function CountRestaurant() {

  const dispatch = useDispatch();

  const {loading, error, count, showVegOnly, pureVegRestaurantsCount} = useSelector((state) => state.restaurants);

  useEffect(()=>{
    dispatch(getRestaurants());
  },[dispatch])

  return (
    <div>
      {
        loading 
        ? (<p>Loading Resturant count...</p>) 
        : (error 
          ? (<p>Error: {error}</p>) 
          : (
            <p className="NumOfRestro">
              {showVegOnly ? pureVegRestaurantsCount : count} {" "}
            <span className='Restro'>
              {
                showVegOnly ? pureVegRestaurantsCount === 1 ? "Restaurant" : "Restaurants"
                            : count === 1 ? "Restaurant" : "Restaurants"
              }
            </span>
            </p>
          ))
      }
      
      <hr />
    </div>
  )
}
