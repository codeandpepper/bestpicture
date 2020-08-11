import Person from "./person";
import Genre from "./genre";

export default interface Movie {
  id: string;
  title: string;
  cover: string;
  poster: string;
  description: string;
  date: Date;
  duration: string;
  rating: number;
  genres: Genre[];
  cast: Person[];
}
