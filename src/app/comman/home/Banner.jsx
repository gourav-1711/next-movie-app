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

export default function Banner({
  movieObject,
  setSelectedMovie,
  setIsModalOpen,
  fetchMovieDetails,
}) {
  const api_key = "04c35731a5ee918f014970082a0088b1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  // https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&language=en-US&page=1
  const [loading, setLoading] = React.useState(true);

  const [upcomingLoading, setUpcomingLoading] = React.useState(true);

  const [banner, setBanner] = React.useState([1, 2, 3, 4]);

  const [cards, setCards] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  //

  const bannerApi = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`
      )
      .then((ress) => {
        console.log(ress.data);
        setLoading(false);
        setBanner(ress.data.results.slice(0, 4));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const upcomingMovie = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=2`
      )
      .then((ress) => {
        console.log(ress.data);
        setCards(ress.data.results.slice(0, 10));
        setUpcomingLoading(false);
      })
      .catch(() => {
        setUpcomingLoading(false);
      });
  };

  React.useEffect(() => {
    bannerApi();
    upcomingMovie();
  }, []);

  const watchNow = (card) => {
    fetchMovieDetails(card.id);
  };

  return (
    <>
      {/* // banner */}
      <div className="max-w-[95vw] mx-auto my-5">
        <div className="text-2xl md:text-4xl capitalize text-[#D5C7CB] font-semibold my-5">
          Trending Movies
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full h-[80vh]"
          >
            <CarouselContent className="-ml-4 h-[80vh]">
              {banner.map((card, index) => (
                <CarouselItem key={index} className="pl-4 h-[80vh]">
                  <Card className="h-[80vh] p-0 bg-transparent border-none shadow-none">
                    <CardContent className="h-[80vh] -p-5">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <img
                          src={
                            card.backdrop_path
                              ? `${IMG_PATH}${card.backdrop_path}`
                              : "/5J0l.gif"
                          }
                          alt={card.title}
                          className="w-full h-full object-cover "
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/100 via-black/40 to-transparent p-6 md:p-10 flex flex-col justify-end text-white">
                          <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow">
                            {card.title}
                          </h2>
                          <p className="text-sm md:text-base mb-4 text-gray-200 line-clamp-3">
                            {card.overview}
                          </p>
                          <div className="flex gap-4">
                            <button
                              onClick={() => watchNow(card)}
                              className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
                            >
                              Watch Now
                            </button>
                            <button className="cursor-pointer border border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-xl transition-all duration-300">
                              + Add to Watchlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

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
                            card.poster_path
                              ? `${IMG_PATH}${card.poster_path}`
                              : `${IMG_PATH}${card.backdrop_path}`
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
