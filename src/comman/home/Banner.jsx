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
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    bannerApi();
    upcomingMovie();
  }, []);

  return (
    <>
      {/* // banner */}
      <div className="max-w-[95vw] mx-auto  my-5">
        <div className=" text-2xl md:text-4xl capitalize text-[#D5C7CB] font-semibold my-5 ">
          {" "}
          Trending Movies
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
        ) : (
          <>
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
              className="w-full h-[70vh] "
            >
              <CarouselContent className="-ml-4 h-[70vh]">
                {banner.map((card, index) => (
                  <CarouselItem key={index} className="pl-4 h-[70vh]">
                    <Card className=" h-[70vh] p-0 bg-transparent border-none shadow-none">
                      <CardContent className=" text-center text-lg font-semibold border-0  h-[70vh] p-0">
                        <div className="relative">
                          <img
                            src={
                              card.backdrop_path
                                ? `${IMG_PATH}${card.backdrop_path}`
                                : "/5J0l.gif"
                            }
                            alt={card.title}
                            className="w-full  rounded-2xl object-cover h-[70vh]"
                          />
                          <div className=" absolute  text-background top-0 left-0 w-full h-full bg-black/30 flex flex-col justify-end items-start p-20">
                            <h2 className=" text-6xl text-shadow-2xl">
                              {card.title}
                            </h2>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </>
        )}
      </div>

      {/* // trending movies */}
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
          <CarouselContent className="-ml-4 w-[99%] mx-auto">
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
        </Carousel>
      </div>
    </>
  );
}
