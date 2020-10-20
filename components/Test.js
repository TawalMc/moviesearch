import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

const Test = () => {

    return ( 
        <View style={styles.main_container}>
            <View style={styles.subview_container}>
                <Text style={{color: "black"}}>Test page</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    subview_container: {
    }

});

export default Test;