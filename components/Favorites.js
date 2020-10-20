import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Avatar from "./Avatar";
import FilmList from "./FilmList";

const Favorites = (props) => {
  function checkFilmFavorite(film) {
    if (
      props.favoritesFilms !== undefined &&
      props.favoritesFilms.findIndex((elt) => elt.id === film.id) !== -1
    ) {
      return true;
    }
    return false;
  }

  const _displayDetailForFilm = (idFilm) => {
    props.navigation.navigate("Detail", {
      idFilm: idFilm,
      from: "Favorites",
    });
  };

  return (
    <View style={styles.favorites_container}>
      <View styles={styles.avatar_container}>
        <Avatar />
        <Text style={styles.text_avatar}>Your avatar</Text>
      </View>
      {props.favoritesFilms !== undefined &&
      props.favoritesFilms.length != 0 ? (
        <FilmList
          films={props.favoritesFilms}
          extraDataFilm={props.favoritesFilms}
          displayDetailForFilm={_displayDetailForFilm}
          checkFilmFavorite={checkFilmFavorite}
        />
      ) : (
        <View style={styles.sub_container}>
          <Text style={styles.text_favorites}>No favorites</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  favorites_container: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
  },
  sub_container: {
    /* alignSelf: "center", */
    marginTop: "50%",
  },
  text_favorites: {
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
  },
  avatar_container: {
  },
  text_avatar: {
      textAlign: "center",
      marginBottom: 20,
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.toggleFavorite.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);
