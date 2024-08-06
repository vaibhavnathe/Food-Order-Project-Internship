import React, { useEffect } from 'react';
import CountRestaurant from './CountRestaurant';
import Restaurant from './Restaurant';
import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from '../../action/restaurantAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getRestaurants());
  },[dispatch]);

  const {loading : restaurantsLoading, 
    error: restaurantsError, 
    restaurants,
    showVegOnly,
  } = useSelector((state) => state.restaurants);

  const handleSortByReview= () => {
    dispatch(sortByReviews());
  }

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  }

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  }

  return (
    <>
      <CountRestaurant/>

      {restaurantsLoading 
        ? (<Loader/> )
        : (restaurantsError 
          ? (<Message variant="danger">{restaurantsError}</Message>) 
            : (
              <section>
              <div className="sort">
                  <button className="sort_veg p-3" 
                        onClick={handleToggleVegOnly}  
                  >
                  {
                    showVegOnly ? "Show All" : "Pure Veg" 
                  }
                  </button>
                  <button className="sort_rev p-3"
                          onClick={handleSortByReview}
                  >
                    Sort By Review
                  </button>
                  <button className="sort_rate p-3"
                        onClick={handleSortByRatings}
                  >
                    Sort By Rating
                  </button>
              </div>
              <div className="row mt-4">
                 {
                  restaurants ?
                  ( restaurants.map((restaurant) => 
                          !showVegOnly || (showVegOnly && restaurant.isVeg) 
                          ? (<Restaurant key={restaurant._id} restaurant={restaurant}/>) 
                          : (null)   
                        ) 
                  ): (<Message variant="info">No Restaurant Found</Message>)
                 }
              </div>
              
              </section>           
              ))} 

    </>
  );
};

export default Home;