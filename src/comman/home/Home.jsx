"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import axios from "axios";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Home() {
  ///////////////////////////////////////////////////
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [selectedGenre, setSelectedGenre] = React.useState();
  const [yearFilter, setYearFilter] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  const [ratingFilter, setRatingFilter] = useState("");
  const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [genres, setGenres] = useState([]);

  ///////////////////////////////////////////////////////

  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&region=IN";
  // const SEARCH_API ;
  const GENRE_API =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1";
  const MOVIE_DETAILS_API = "https://api.themoviedb.org/3/movie/";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  ///////////////////////////////////////////////////////////

  const fetchGenres = async () => {
    try {
      const response = await fetch(GENRE_API);
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      setGenres(data.genres);
      console.log(data.genres);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  ////////////////////////////////////////////////////////

  const fetchMovie = () => {
    setLoading(true);
    let url = `${API_URL}&page=${page}`;

    if (searchTerm !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${searchTerm}`;
      console.log(searchTerm);
    }

    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
      console.log(selectedGenre);
    }

    if (yearFilter) {
      url += `&primary_release_year=${yearFilter}`;
    }

    if (ratingFilter > 0) {
      url += `&vote_average.gte=${ratingFilter}`;
    }

    axios.get(url)
      .then((ress) => {
        setMovies(ress.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchMovie();
  }, [page, searchTerm, yearFilter, selectedGenre, ratingFilter]);

  return (
    <>
      <Banner />

      {/* movies section */}
      <div className="header max-w-[96vw] mx-auto my-5 pt-10 space-y-4">
        {/* page and search */}
        <div className=" grid grid-cols-2 gap-2 sm:grid-cols-[45%_auto] md:grid-cols-[30%_auto] lg:grid-cols-[25%_auto] ">
          {/* page */}
          <div className="page-btn">
            {movies.length > 0 && (
              <div className="flex  gap-2  md:gap-4">
                <Button
                  onClick={handlePrevPage}
                  disabled={page === 1 || searchTerm !== ""}
                  className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="flex items-center px-4 py-2 text-foreground bg-background font-bold rounded-md">
                  Page {page}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={searchTerm !== ""}
                  className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </div>
          {/* search */}
          <div className="w-full ">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-background"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
        {/*  filter*/}
        <div className="flex flex-col md:flex-row gap-4">
          {/* genre */}
          <div className="w-full  flex flex-col items-center justify-center md:flex-row gap-4">
            <div className="relative w-full">
              <Select value={selectedGenre} onValueChange={setSelectedGenre} className="w-[200px]">
                <SelectTrigger className="w-full   bg-black/50 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm">
                  <SelectValue
                    placeholder="Select a movie genre"
                    className="text-purple-100 font-medium"
                  />
                </SelectTrigger>
                <SelectContent className=" bg-black/95 border-2 border-purple-500/50 rounded-xl backdrop-blur-md shadow-2xl shadow-purple-500/20">
                  <SelectGroup>
                    <SelectLabel className="text-purple-300 font-semibold text-sm uppercase tracking-wider px-3 py-2">
                      Movie Genres
                    </SelectLabel>
                    {/* <SelectItem
                        value={""}
                        className="text-purple-100 hover:bg-purple-900/30 hover:text-purple-200 focus:bg-purple-800/40 focus:text-white cursor-pointer transition-all duration-200 rounded-lg mx-1 my-0.5 font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></span>
                          All Genres
                        </span>
                      </SelectItem> */}
                    {genres.map((genre) => (
                      <SelectItem
                        key={genre.id}
                        value={genre.id}
                        className="text-purple-100 hover:bg-purple-900/30 hover:text-purple-200 focus:bg-purple-800/40 focus:text-white cursor-pointer transition-all duration-200 rounded-lg mx-1 my-0.5 font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></span>
                          {genre.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Neon glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl -z-10 opacity-50"></div>
            </div>
          </div>
          {/* year */}
          <div className="w-full  flex flex-col items-center justify-center md:flex-row gap-4">
            <div className="relative w-full">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full   bg-black/50 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm">
                  <SelectValue
                    placeholder="Select Release Year"
                    className="text-purple-100 font-medium"
                  />
                </SelectTrigger>
                <SelectContent className=" bg-black/95 border-2 border-purple-500/50 rounded-xl backdrop-blur-md shadow-2xl shadow-purple-500/20">
                  <SelectGroup>
                    <SelectLabel
                      onClick={() => setYearFilter("")}
                      className="cursor-pointer text-purple-300 font-semibold text-sm uppercase tracking-wider px-3 py-2"
                    >
                      All Release Years
                    </SelectLabel>
                    {/* <SelectItem
                        value={"Clear"}
                        className="text-purple-100 hover:bg-purple-900/30 hover:text-purple-200 focus:bg-purple-800/40 focus:text-white cursor-pointer transition-all duration-200 rounded-lg mx-1 my-0.5 font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></span>
                          Clear
                        </span>
                      </SelectItem> */}
                    {years.map((year) => (
                      <SelectItem
                        key={year}
                        value={year}
                        className="text-purple-100 hover:bg-purple-900/30 hover:text-purple-200 focus:bg-purple-800/40 focus:text-white cursor-pointer transition-all duration-200 rounded-lg mx-1 my-0.5 font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></span>
                          {year}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Neon glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl -z-10 opacity-50"></div>
            </div>
          </div>
          {/* rating */}
          <div className="w-full  flex flex-col items-center justify-center md:flex-row gap-4">
            <div className="relative w-full">
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full   bg-black/50 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm">
                  <SelectValue
                    placeholder="Select Rating"
                    className="text-purple-100 font-medium"
                  />
                </SelectTrigger>
                <SelectContent className=" bg-black/95 border-2 border-purple-500/50 rounded-xl backdrop-blur-md shadow-2xl shadow-purple-500/20">
                  <SelectGroup>
                    <SelectLabel
                      onClick={() => setRatingFilter("")}
                      className="cursor-pointer text-purple-300 font-semibold text-sm uppercase tracking-wider px-3 py-2"
                    >
                      All Ratings
                    </SelectLabel>

                    {rating.map((rate) => (
                      <SelectItem
                        key={rate}
                        value={rate}
                        className="text-purple-100 hover:bg-purple-900/30 hover:text-purple-200 focus:bg-purple-800/40 focus:text-white cursor-pointer transition-all duration-200 rounded-lg mx-1 my-0.5 font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"></span>
                          {rate}+
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Neon glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl -z-10 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* movie section */}
      <div className="max-w-[1100px]  mx-auto w-[95%] md:w-full mt-3 pb-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-6">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    imgPath={IMG_PATH}
                    // getClassByRate={getClassByRate}
                    // onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-xl">
                  No movies found
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function MovieCard({ movie, imgPath }) {
  // getClassByRate, onViewDetails
  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-200 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 h-full flex flex-col py-0">
      <div className="relative rounded-2xl">
        <img
          src={
            movie.poster_path
              ? `${imgPath}${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className="w-full  object-cover rounded-2xl"
        />
        <div className="absolute top-2 right-2 bg-background p-1 rounded-md">
          <span className={`font-bold `}>
            {/* ${getClassByRate(movie.vote_average)} */}
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      <CardContent className=" p-2 flex-grow flex flex-col">
        <h3 className="text-lg text-[white] font-semibold mb-1 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{movie.release_date}</p>
        <p className="text-sm text-gray-300 line-clamp-3 flex-grow">
          {movie.overview}
        </p>
        <Button
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
          onClick={() => onViewDetails(movie.id)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
