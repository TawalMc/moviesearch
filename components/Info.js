import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Info = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text_title}>
          Cette application (bêta avec quelques bugs🤣) vous permet d'avoir des informations sur des
          films en faisiant des recherches basées sur un mot.
        </Text>
      <View style={styles.search_view_text}>
        <Text>
          1. 😎Entrez un mot dans la barre de recherche et lancez la recherche sur
          la page Search pour avoir une liste de films dont les titres
          contiennent le mot entré.
        </Text>
      </View >
      <View style={styles.detail_view_text}>
        <Text>2. 🤩Cliquez sur un film pour accéder à ses détails.</Text>
        <Text>
          2.1. Cliquez sur l'icône de coeur/favoris (🖤) pour ajouter le film à vos
          favoris.
        </Text>
        <Text>
          2.2. Cliquez sur le bouton de partage pour partager la description du
          film, sur whatsapp pa exemple.
        </Text>
      </View>
      <View style={styles.favorites_view_text}>
        <Text>
          3. 😋Accédez à la liste de vos films favoris en cliquant sur Favorites
          dans la barre de navigation en bas.
        </Text>
        <Text>
          3.1. Défilez pour voir vos films favoris et bonus, vous pouvez définir
          votre avatar.
        </Text>
      </View>

      <View style={styles.end_view_text}>
        <Text>Simple n'est ce pas?😒</Text>
        <Text style={styles.twitter_account}>Twitter: @Tawal_Mc</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
    },
    text_title: {
        fontSize: 15,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    twitter_account: {
        fontWeight: "bold",

    }
});

export default Info;
