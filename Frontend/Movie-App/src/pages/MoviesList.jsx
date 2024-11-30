import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ViewList as ViewListIcon, GridView as GridViewIcon, DarkMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../Redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../utils/DarkModeToggle";
import AppBarComponent from "../Components/AppBar";

const MovieList = () => {
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [moviesData, setMoviesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://itunes.apple.com/search?term=star&country=au&media=movie"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMoviesData(data.results); 
        dispatch(setMovies(data.results));
        
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []); 

  
  const paginatedMovies = moviesData.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const handleViewChange = (event, newView) => {
    if (newView !== null) setView(newView);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
    <AppBarComponent/>
    <Container maxWidth="lg"  sx={{ py: 4 ,marginTop:5}}>
        
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Movies
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="View Toggle"
        >
          <ToggleButton value="grid" aria-label="Grid View">
            <GridViewIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="List View">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {view === "grid" ? (
        <Grid container spacing={3}>
          {paginatedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.trackId}>
              <Card onClick={()=>navigate(`movies/${movie.trackId}`)}sx={{
                height:'360px',
                maxHeight:'360px'
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.artworkUrl100}
                  alt={movie.trackName}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {movie.trackName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.primaryGenreName}
                  </Typography>
                  <Typography variant="body2" color="text.primary" fontWeight="bold">
                    ${movie.trackPrice || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={3}>
          {paginatedMovies.map((movie) => (
            <Card key={movie.trackId} sx={{ display: "flex", padding: 2, boxShadow: 2 }} onClick={()=>navigate(`movies/${movie.trackId}`)}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, mr: 2 }}
                image={movie.artworkUrl100}
                alt={movie.trackName}
              />
              <Stack>
                <Typography variant="h6" fontWeight="bold">
                  {movie.trackName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.primaryGenreName}
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                  ${movie.trackPrice || "N/A"}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
        <Pagination
          count={Math.ceil(moviesData.length / moviesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Container>
    </>
  );
};

export default MovieList;
