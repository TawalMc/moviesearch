import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { connect } from "react-redux";
import { getFilmDetailFromApi, getImageFromApi } from "../api/TMDBApi";
import moment from "moment";
import numeral from "numeral";

const FilmDetail = (props) => {
  const [film, setFilm] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { idFilm, from } = props.route.params;

  useEffect(() => {
    // props.route.params.idFilm
    if (from === "Search") {
      getFilmDetailFromApi(idFilm).then((data) => {
        setFilm(data);
        setIsLoading(false);
      });
    } else if (from === "Favorites") {
      var indexFilm = props.favoritesFilms.findIndex(
        (elt) => elt.id === idFilm
      );

      setIsLoading(false);
      setFilm(indexFilm === -1 ? undefined : props.favoritesFilms[indexFilm]);
    }
  }, []);

  // Redux config
  function _toggleFovorite() {
    const action = {
      type: "TOGGLE_FAVORITE",
      value: film,
    };
    props.dispatch(action);
  }

  // Button and sub component
  function DisplayLoading() {
    return (
      isLoading && (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#f5864e" />
        </View>
      )
    );
  }

  function _shareFilm() {
    // Share message to wh
    const backdrop_img = getImageFromApi(film.backdrop_path);
    const overview = `Film: ${film.title} \n\n Poster lien: ${backdrop_img} \n\n Description: ${film.overview}`;
    Share.share({ title: film.title, message: overview }, {dialogTitle: film.title});
  }

  function ShareButton() {
    return ( film != undefined &&
      <TouchableOpacity
        style={styles.button_share_container}
        onPress={() => _shareFilm()}
      >
        <Image
          source={require("../Images/ic_share.png")}
          style={styles.img_share}
        />
      </TouchableOpacity>
    );
  }

  // Component
  function DisplayFavoriteImage() {
    var favoriteImage = require("../Images/ic_favorite_border.png");
    if (props.favoritesFilms.findIndex((item) => item.id === film.id) !== -1) {
      favoriteImage = require("../Images/ic_favorite.png");
    }
    return <Image style={styles.favorite_image} source={favoriteImage} />;
  }

  function DisplayFilm() {
    return (
      film != undefined && (
        <>
        <ShareButton />
        <ScrollView style={styles.scrollview_container}>
          <View style={styles.img_container}>
            <Image
              style={styles.img_film}
              source={{ uri: getImageFromApi(film.backdrop_path) }}
            />
          </View>

          <View styles={styles.detail_part}>
            <Text style={styles.title}> {film.title} </Text>

            <TouchableOpacity
              style={styles.favorites_container}
              onPress={() => _toggleFovorite()}
            >
              <DisplayFavoriteImage />
            </TouchableOpacity>

            

            <Text style={styles.description}> {film.overview} </Text>

            <View styles={styles.sub_detail}>
              <Text style={styles.info_text}>Date de Sorti: {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>

              <Text style={styles.info_text}>Budget : {film.budget == 0 ? "Inconnu" : numeral(film.budget).format('0,0[.]00 $')}</Text>

              <Text style={styles.info_text}>Note: {film.vote_average}/10</Text>

              <Text style={styles.info_text}>
                Nombre de votes: {film.vote_count}
              </Text>

               <Text style={styles.info_text}>Genre(s): {film.genres.map((gnr, index) => {
              return `${gnr.name} ${index < film.genres.length - 1 ? "/" : ""}`;
            })}
            </Text>

            <Text style={styles.info_text}>Companie(s): {film.production_companies.map((cmp, index) => {
              return `${cmp.name} ${index < film.production_companies.length - 1 ? "/" : ""}`;
            })}
            </Text>
            </View>
          </View>
        </ScrollView>
        </>
      )
    );
  }

  return (
    <View style={styles.main_container}>
      <DisplayLoading />
      <DisplayFilm />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#e3e6e5",
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
    padding: 4,
  },
  img_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_film: {
    height: 205,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
  },
  detail_part: {
    flex: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  favorites_container: {
    alignItems: "center",
  },
  favorite_image: {
    width: 40,
    height: 40,
  },
  description: {
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 10,
  },
  sub_detail: {
    flex: 1,
    alignContent: "space-between",
    minHeight: 250,
  },
  info_text: {
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 10,
  },
  button_share_container: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    bottom: 30,
    right: 30,
    zIndex: 1,
    shadowColor: "#f5864e",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
    backgroundColor: "#f5864e",
    justifyContent: "center",
    alignItems: "center"
  },
  img_share: {
    width: 30,
    height: 30
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.toggleFavorite.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmDetail);
