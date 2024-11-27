import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ArrowBackRounded } from "@mui/icons-material";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Safely access movies data from Redux
  const moviesData = useSelector((state) => state?.auth?.movies || []);

  // Find the movie with the matching ID
  const movie = moviesData.find((movie) => movie.trackId === parseInt(id, 10));

  // Render error message if the movie is not found
  if (!movie) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Movie Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Back Button */}
      <Box sx={{ position: "absolute", top: 16, left: 16 }}>
        <IconButton onClick={() => navigate("/movies-list")} aria-label="Back">
          <ArrowBackRounded fontSize="large" />
        </IconButton>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Movie Details */}
        <Card sx={{ mt: 4, boxShadow: 3 }}>
          <CardMedia
            component="img"
            image={movie.artworkUrl100 || "https://via.placeholder.com/400"}
            alt={movie.trackName || "Movie artwork"}
            sx={{ maxHeight: 400, objectFit: "cover" }}
          />
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              {movie.trackName || "Untitled Movie"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {movie.description || "No description available."}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
              <strong>Release Date:</strong>{" "}
              {movie.releaseDate
                ? new Date(movie.releaseDate).toLocaleDateString()
                : "Unknown"}
            </Typography>
            <Typography variant="body2" color="text.primary">
              <strong>Director:</strong> {movie.director || "Unknown"}
            </Typography>
            <Typography variant="body2" color="text.primary">
              <strong>Cast:</strong>{" "}
              {movie.cast && movie.cast.length > 0
                ? movie.cast.join(", ")
                : "No cast information available"}
            </Typography>
          </Box>
        </Card>

        {/* Video Player */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Preview/Trailer
          </Typography>
          {movie.previewUrl ? (
            <video controls style={{ width: "100%", maxHeight: "400px" }}>
              <source src={movie.previewUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No preview available for this movie.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default MovieDetails;
