import React, { useState, useEffect } from "react";
import "./App.css";
import ReactLoading from "react-loading";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  const list = [
    {
      prop: "spinningBubbles",
      name: "SpinningBubbles",
    },
  ];
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {
        <div className="grid md:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1  gap-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-[100vh] w-[100vw] mx-auto">
              <ReactLoading type={list.prop} color="black" />
            </div>
          ) : (
            images.map((image) => (
              <div className="mx-auto">
                <ImageCard key={image.id} image={image} />
              </div>
            ))
          )}
        </div>
      }
    </div>
  );
}

export default App;
