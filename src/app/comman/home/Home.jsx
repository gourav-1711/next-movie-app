"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import axios from "axios";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Film,
  Search,
  Star,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddToCollectionDialog from "../collection/AddToCollectionModal";
import AddToCollectionModal from "../collection/AddToCollectionModal";

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
  const rating = [4, 5, 6, 7, 8, 9];

  const [genres, setGenres] = useState([]);

  /////////////////////////////////////

  // Modal state
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieVideos, setMovieVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState();
  const [modalLoading, setModalLoading] = useState(false);
  const [movieDetailGenres, setMovieDetailGenres] = useState([]);

  const [openModal, setOpenModal] = useState(false);
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

    axios
      .get(url)
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

  ///////////////////////////////

  const fetchMovieDetails = async (movieId) => {
    setModalLoading(true);
    try {
      // Fetch movie details
      const detailsResponse = await fetch(
        `${MOVIE_DETAILS_API}${movieId}?api_key=04c35731a5ee918f014970082a0088b1`
      );
      if (!detailsResponse.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const movieDetails = await detailsResponse.json();

      // Fetch movie videos
      const videosResponse = await fetch(
        `${MOVIE_DETAILS_API}${movieId}/videos?api_key=04c35731a5ee918f014970082a0088b1`
      );
      if (!videosResponse.ok) {
        throw new Error("Failed to fetch movie videos");
      }
      const videosData = await videosResponse.json();

      setSelectedMovie(movieDetails);
      console.log(movieDetails.genres);
      setMovieDetailGenres(movieDetails.genres);

      setMovieVideos(videosData.results);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching movie details:", err);
    } finally {
      setModalLoading(false);
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getClassByRate = (vote) => {
    if (vote >= 8) return "text-green-500";
    else if (vote >= 5) return "text-orange-500";
    else return "text-red-500";
  };

  const getTrailer = () => {
    // First try to find a YouTube trailer
    const youtubeTrailer = movieVideos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );

    // If no trailer, try to find a teaser
    if (!youtubeTrailer) {
      const youtubeTeaser = movieVideos.find(
        (video) => video.site === "YouTube" && video.type === "Teaser"
      );
      return youtubeTeaser;
    }

    return youtubeTrailer;
  };

  const handleViewDetails = (movieId) => {
    fetchMovieDetails(movieId);
  };

  /////////////////////////////////////
  useEffect(() => {
    fetchMovie();
  }, [page, searchTerm, yearFilter, selectedGenre, ratingFilter]);

  return (
    <>
      <Banner
        movieObject={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        setIsModalOpen={setIsModalOpen}
        fetchMovieDetails={fetchMovieDetails}
      />

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
              <Select
                value={selectedGenre}
                onValueChange={setSelectedGenre}
                className="w-[200px]"
              >
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
                    getClassByRate={getClassByRate}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-xl">
                  No movies found
                </div>
              )}
            </div>

            {/* Movie Details Modal */}
            <Dialog
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              className="w-full"
            >
              <DialogContent className="bg-gray-800 scrollbar-hide text-white border-gray-700 w-[85vw] max-w-[85vw] h-[90vh] overflow-y-auto">
                {modalLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : selectedMovie ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        {selectedMovie.title}
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        {selectedMovie.release_date &&
                          new Date(selectedMovie.release_date).getFullYear()}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1  gap-6 mt-4">
                      {/* Trailer Section */}
                      <div className="w-full">
                        {getTrailer() ? (
                          <div className="aspect-video w-full rounded-lg overflow-hidden">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${
                                getTrailer()?.key
                              }`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            ></iframe>
                          </div>
                        ) : (
                          <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
                            <div className="text-center p-4">
                              <Film className="w-16 h-16 mx-auto mb-2 text-gray-500" />
                              <p className="text-gray-400">
                                No trailer available
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Movie Info Section */}
                      <div className="flex flex-col gap-4">
                        {/* Backdrop Image */}
                        {selectedMovie.backdrop_path && (
                          <div className="rounded-lg overflow-hidden">
                            <img
                              src={`${IMG_PATH}${selectedMovie.backdrop_path}`}
                              alt={`${selectedMovie.title} backdrop`}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}

                        {/* Movie Stats */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-white" />
                            <span>
                              {new Date(
                                selectedMovie.release_date
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {selectedMovie.runtime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-white" />
                              <span>
                                {formatRuntime(selectedMovie.runtime)}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span
                              className={getClassByRate(
                                selectedMovie.vote_average
                              )}
                            >
                              {selectedMovie.vote_average.toFixed(1)} (
                              {selectedMovie.vote_count} votes)
                            </span>
                          </div>
                        </div>

                        {/* Add to Collection Button */}
                        <Button
                          onClick={() => setOpenModal(true)}
                          className="w-fit text-white px-3 py-1 rounded cursor-pointer"
                        >
                          Add to Collection
                        </Button>

                        <AddToCollectionModal
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                          movie={selectedMovie}
                        />
                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                          {movieDetailGenres && movieDetailGenres.length > 0
                            ? movieDetailGenres.map((genre) => (
                                <div
                                  key={genre.id}
                                  className="bg-purple-900/50 text-sm text-white border p-1 rounded-full"
                                >
                                  {genre.name}
                                </div>
                              ))
                            : "No genres"}
                        </div>

                        {/* Overview */}
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Overview
                          </h3>
                          <p className="text-gray-300">
                            {selectedMovie.overview}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    No movie details available
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </>
  );
}

function MovieCard({ movie, imgPath, getClassByRate, onViewDetails }) {
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
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 cursor-pointer"
          onClick={() => onViewDetails(movie.id)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
