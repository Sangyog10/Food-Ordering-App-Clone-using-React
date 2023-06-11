import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState();

  // useEffect(() => {
  //   const fetchMovieHandler = async () => {
  //     // setIsLoading(true);
  //     const response = await fetch("https://dummyjson.com/products");
  //     if (!response.ok) {
  //       throw new Error("something went wrong");
  //     }
  //     const data = await response.json();
  //     const receivedData = data.products.map((val) => {
  //       return {
  //         id: val.id,
  //         name: val.title,
  //         description: val.description,
  //         price: Math.random() * 1000,
  //       };
  //     });
  //     setMeals(receivedData);
  //   };

  //   fetchMovieHandler().catch((error) => {
  //     setIsError(error.message);
  //     setIsLoading(false);
  //   });
  // }, []);

  const fetchMovieHandler = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const receivedData = data.products.map((val) => {
      return {
        id: val.id,
        name: val.title,
        description: val.description,
        price: Math.random() * 1000,
      };
    });
    setMeals(receivedData);
  };

  useEffect(() => {
    fetchMovieHandler();
  }, []);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading content...</p>
  //     </section>
  //   );
  // }
  // if (isError) {
  //   return <h3>{isError}</h3>;
  // }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
