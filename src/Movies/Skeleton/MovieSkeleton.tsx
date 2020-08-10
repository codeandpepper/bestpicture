import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Skeleton from "@material-ui/lab/Skeleton";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 240,
    },
    chip: {
      marginRight: theme.spacing(1),
    },
  })
);

const MovieSkeleton = () => {
  const classes = useStyles();

  return (
    <Card>
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardContent>
        <Box display="flex" alignItems="flex-start">
          <Box width={1 / 3} display="flex">
            <Box display="flex" mt={1} ml={1}>
              {Array.from(new Array(3)).map((_, index: number) => (
                <Skeleton
                  key={index}
                  animation="wave"
                  variant="circle"
                  width={40}
                  height={40}
                />
              ))}
            </Box>
          </Box>
          <Box ml={1.25} width={2 / 3}>
            <Box>
              {Array.from(new Array(3)).map((_, index: number) => (
                <Skeleton
                  key={index}
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
              ))}
              <Skeleton animation="wave" height={10} width="80%" />
            </Box>
            <Box display="flex" mt={2}>
              {Array.from(new Array(2)).map((_, index: number) => (
                <Skeleton
                  key={index}
                  animation="wave"
                  height={20}
                  width="15%"
                  className={classes.chip}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieSkeleton;
