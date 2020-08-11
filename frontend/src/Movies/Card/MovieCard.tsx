import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import moment from "moment";
import { gql } from "@apollo/client";

import Movie from "../movie";
import Person from "../person";
import Genre from "../genre";
import MovieRating from "./Rating/MovieRating";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 240,
    },
    title: {
      color: theme.palette.grey[100],
    },
    subtitle: {
      marginTop: theme.spacing(-1),
      color: theme.palette.grey[400],
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    rating: {
      color: orange[300],
    },
  })
);

export interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const classes = useStyles();

  const formatDuration = (duration: string): string => {
    let ms = moment.duration(duration).asMilliseconds();
    return moment.utc(ms).format("h[h] mm[min]");
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={movie.cover}>
          <Box display="flex" alignItems="flex-start" height="100%">
            <Box width={1 / 3}></Box>
            <Box
              width={2 / 3}
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                className={classes.title}
              >
                {movie.title}
              </Typography>

              <Box display="flex" alignItems="flex-start">
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.subtitle}
                >
                  {moment(movie.date).year()}
                </Typography>
                <Box ml={1}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.subtitle}
                  >
                    {formatDuration(movie.duration)}
                  </Typography>
                </Box>
              </Box>
              <MovieRating rating={movie.rating} />
            </Box>
          </Box>
        </CardMedia>
        <CardContent>
          <Box display="flex" alignItems="flex-start">
            <Box width={1 / 3}>
              <Box mt={-15}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  width={150}
                  height={218}
                />
              </Box>
              <Box mt={1} ml={1}>
                <AvatarGroup max={3}>
                  {(movie.cast || []).map((person: Person) => (
                    <Tooltip title={person.name} key={person.name}>
                      <Avatar alt={person.name} src={person.picture} />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Box>
            </Box>
            <Box ml={1.25} width={2 / 3}>
              <Box mt={1} height={100}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {movie.description}
                </Typography>
              </Box>
              <Box ml={-0.5}>
                {(movie.genres || []).map((genre: Genre) => (
                  <Chip
                    size="small"
                    key={genre.id}
                    label={genre.name}
                    className={classes.chip}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

MovieCard.fragments = {
  card: gql`
    fragment MovieCardFragment on Movie {
      id
      title
      cover
      poster
      description
      date
      duration
      genres {
        id
        name
      }
      cast {
        name
        picture
      }
      ...MovieRatingFragment
    }
    ${MovieRating.fragments.rating}
  `,
};

export default MovieCard;
