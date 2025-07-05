// components/AutoCarousel.tsx
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

export default function Banner() {
  const api_key = "04c35731a5ee918f014970082a0088b1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  // https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&language=en-US&page=1
  const [loading, setLoading] = React.useState(true);

  const [upcomingLoading, setUpcomingLoading] = React.useState(true);

  const [banner, setBanner] = React.useState([1, 2, 3, 4]);

  const [cards, setCards] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  //

  const upcomingMovie = async () => {
    const options = {
      method: "GET",
      url: "https://imdb236.p.rapidapi.com/api/imdb/upcoming-releases",
      params: {
        countryCode: "US",
        type: "MOVIE",
      },
      headers: {
        "x-rapidapi-key": "5f0323ef84msh745b88c630bfac5p1485abjsn7b94adffcce0",
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const valuesArray = Object.values(response.data);

      // Step 2: Flatten the titles arrays
      const allMovies = valuesArray.flatMap((entry) => entry.titles);

      // Step 3: Take first 10 movies
      const upcomingMovies = allMovies.slice(0, 10);

      setCards(upcomingMovies);
      setUpcomingLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUpcomingLoading(false);
    }
  };

  React.useEffect(() => {
    upcomingMovie();
  }, []);

  const watchNow = (card) => {
    fetchMovieDetails(card.id);
  };

  return (
    <>
      {/* // upcoming movies */}
      <div className=" max-w-[1200px] mx-auto  mb-5 w-[95%] md:w-full">
        <div className=" text-2xl md:text-4xl capitalize text-[#D5C7CB] font-semibold my-5 ">
          {" "}
          Upcoming Movies
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 1500,
            }),
          ]}
          opts={{
            loop: false,
          }}
          className="w-full"
        >
          {upcomingLoading ? (
            <div className="flex justify-center items-center h-[80vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <CarouselContent className="-ml-1 md:-ml-4 w-[99%] mx-auto">
              {cards.map((card, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-1/2 sm:basis-1/4 md:basis-1/4 lg:basis-1/5 "
                >
                  <Card className=" flex items-center justify-center  p-0 bg-transparent border-none shadow-none">
                    <CardContent className=" text-center text-lg font-semibold  p-0 ">
                      <div className="relative">
                        <img
                          src={
                            card.primaryImage
                          }
                          alt={card.title}
                          className="rounded-[20px] h-[300px] w-[100%] border-[3px] border-[transparent] hover:border-[3px] hover:border-[white] "
                        />
                        <div className="absolute bottom-[10%] left-3.5 text-background text-left bg-black blur-lg">
                          <h3 className=" text-[15px] md:text-lg ">
                            {card.title}
                          </h3>
                          <h4 className="text-[12px] md:text-sm">
                            Release Date: ${card.release_date}
                          </h4>
                        </div>
                        <div className="absolute bottom-[10%] left-3.5 text-background text-left ">
                          <h3 className="text-[15px] md:text-lg ">
                            {card.title}
                          </h3>
                          <h4 className=" text-[12px] md:text-sm">
                            Release Date: ${card.release_date}
                          </h4>
                        </div>

                        <p className="absolute top-[-8%] left-[-6%] text-[38px] text-[white] p-[10px_5px] stroke-[white] stroke-[3px] text-shadow-[2px_0px_6px_black]">
                          {index + 1}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
        </Carousel>
      </div>
    </>
  );
}
