/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from "../api/TMDBApi";
import {StyleSheet, View, Button, TextInput, FlatList, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FilmList from './FilmList';

var page = 0;
var totalPages = 0;
var searchedText = "";

const Search = (props) => {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    function IndicatorActivity () {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" color="#f5864e" />
            </View>
        )
    }

    function DisplayLoading() {
        return (
            isLoading && <IndicatorActivity />
        );
    }

    function _searchFilms() {
        page = 0;
        totalPages = 0; 
        setFilms([]);
        _loadFilms();
    }

    function _loadFilms() {
        if (searchedText.length > 0) {
            setIsLoading(true);

            getFilmsFromApiWithSearchedText(searchedText, page+1)
            .then(data => {
                page= data.page;
                totalPages = data.total_pages;

                setFilms(previousFilms => [...previousFilms, ...data.results]);
                setIsLoading(false);
            });
        }
    }

    function _whenLoadingFIlms() {
        if (page < totalPages) {
            _loadFilms();
        }
    }

    function _searchTextInputChanged(text) {
        searchedText = text;
    }
    
    function checkFilmFavorite(film) {
        if(props.favoritesFilms !== undefined && props.favoritesFilms.findIndex(elt => elt.id === film.id) !== -1) {
            return true;
        }
        return false;
    }

    const _displayDetailForFilm = (idFilm) => {
        props.navigation.navigate("Detail", {
            idFilm: idFilm,
            from: "Search"
        });
    }

    return (
        <View 
            style={styles.main_container}>
            <View style={styles.sub_container}>
                <TextInput
                    placeholder="Enter a word to search film..."  
                    style={styles.textInput} 
                    onChangeText={(text) => _searchTextInputChanged(text)} 
                    onSubmitEditing={() => _searchFilms()}
                    />
                <Button title="Search"
                    onPress={() => _searchFilms()}
                    style={styles.buttonSearch} 
                    color={'#5e738a'} 
                />
            </View>

            <FilmList films={films}
                extraDataFilm={props.favoritesFilms}
                displayDetailForFilm={_displayDetailForFilm}
                checkFilmFavorite={checkFilmFavorite}   
                whenLoadingFilms={_whenLoadingFIlms}
            />
            
            {/* <FlatList data={films}
                extraData={props.favoritesFilms}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    
                    if (page < totalPages) {
                        _loadFilms();
                    }
                }}
                renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={_displayDetailForFilm} isFilmFavorite={checkFilmFavorite(item)} />} 
                /> */}

            <DisplayLoading />
        </View>
)};

/* Search.defaultProps = {
    _films: [],
};
 */

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 5,
        marginLeft: 15,
        marginRight: 15
    },
    sub_container: {
        alignItems: "center",
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,

        height: 50,
        width: '90%',
        paddingLeft: 15,
        marginBottom: 5,
    },
    buttonSearch: {
        paddingLeft: 20,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilms: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search);
