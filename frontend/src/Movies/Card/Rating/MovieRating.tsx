import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import Rating from "@material-ui/lab/Rating";
import { gql } from "@apollo/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rating: {
      color: orange[300],
    },
    iconEmpty: {
      color: theme.palette.grey[400],
    },
    label: {
      color: "white",
    },
  })
);

export interface Props {
  rating: number;
}

const MovieRating = ({ rating }: Props) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="static"
          value={rating * 10}
          className={classes.rating}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body1" component="div" className={classes.label}>
            {rating}
          </Typography>
        </Box>
      </Box>
      <Box ml={1}>
        <Rating
          value={rating}
          max={10}
          precision={0.5}
          readOnly
          className={classes.rating}
          classes={{ iconEmpty: classes.iconEmpty }}
        />
      </Box>
    </Box>
  );
};

MovieRating.fragments = {
  rating: gql`
    fragment MovieRatingFragment on Movie {
      rating
    }
  `,
};

export default MovieRating;
