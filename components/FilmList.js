import React from "react";
import { FlatList } from "react-native";
import FilmItem from "./FilmItem";

const FilmList = ({ films, extraDataFilm, displayDetailForFilm, checkFilmFavorite, whenLoadingFilms }) => {
  return (
    <FlatList
      data={films}
      extraData={extraDataFilm}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={whenLoadingFilms}
      renderItem={({ item }) => (
        <FilmItem
          film={item}
          displayDetailForFilm={displayDetailForFilm}
          isFilmFavorite={checkFilmFavorite(item)}
        />
      )}
    />
  );
};

export default FilmList;
