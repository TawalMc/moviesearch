/* eslint-disable prettier/prettier */
import React from "react";
import { getImageFromApi } from "../api/TMDBApi";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const FilmItem = (props) => {
  const { film, displayDetailForFilm, isFilmFavorite} = props;

  function DisplayFavoriteImage() {
    var favoriteImage = require("../Images/ic_favorite.png");
    return (
        isFilmFavorite === true && 
        <Image source={require("../Images/ic_favorite.png")} style={styles.favorite_image} />
    ); 
  }

  return (
    <TouchableOpacity
      style={styles.main_container}
      onPress={() => displayDetailForFilm(film.id)}
    >
      <Image
        style={styles.img_film}
        source={{ uri: getImageFromApi(film.poster_path) }}
      />

      <View style={styles.second_container}>
        <View style={styles.second_container_1}>
          {/* <DisplayFavoriteImage /> */}
 
         { isFilmFavorite && <Image source={require("../Images/ic_favorite.png")} 
            style={styles.favorite_image} />}

          <Text style={styles.title_text}>{film.title}</Text>
          <Text style={styles.vote_text}>{film.vote_average}</Text>
        </View>
        {/* <View style={styles.description}> */}
        <Text style={styles.description} numberOfLines={5}>
          {film.overview}
        </Text>
        {/* </View> */}
        {/* <View styles={styles.date}> */}
        <Text style={styles.date}>Sorti le {film.release_date}</Text>
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flexDirection: "row",
    height: 150,
    width: "95%",
    marginBottom: 15,
    /* backgroundColor: '#ededed', */
    borderRadius: 15,
  },
  img_film: {
    flex: 1,
    height: "100%",
    borderRadius: 15,
    /* borderColor: 'blue', */
    marginRight: "2%",
  },

  second_container: {
    flex: 2,
    /* borderWidth: 1,
        borderColor: 'blue', */
    height: "100%",
    padding: 5,
  },

  second_container_1: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 2,
  },
  favorite_image: {
    width: 20,
    height: 20
  },
  title_text: {
    /* borderWidth: 1, */
    flex: 2,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
    marginLeft: 5,
  },
  vote_text: {
    /* borderWidth: 1, */
    flex: 1,
    marginLeft: 2,
    textAlign: "right",
  },

  description: {
    flex: 2.5,
    fontStyle: "italic",
  },
  date: {
    flex: 0.5,
    /* width: '100%', */
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 15,
  },
});


export default FilmItem;
