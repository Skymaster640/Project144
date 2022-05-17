import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class Popularscreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            articledetails: []
        }
    }


    getarticle = () =>{
        const url = "http://localhost:5000/popular-article"
        axios.get(url).then(response =>{
            let details = response.data.data
            this.setState({
                articledetails:details
            })
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    componentDidMount(){
        this.getarticle()
    }

    keyExtractor = (item,index) => index.toString();

    renderItems = ({item, index}) =>{
        return (
            <Card
        key={`card-${index}`}
        featuredTitle={item.title}
        containerStyle={styles.cardContainer}
        featuredTitleStyle={styles.title}
        featuredSubtitleStyle={styles.subtitle}
      ></Card>
        )
    }

    render(){
        const {data} = this.state;
        return(
            <View style={styles.container}>
                <FlatList
                data={data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItems}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    title: {
      color: "#fff",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(25),
      marginTop: RFValue(65)
    },
    subtitle: {
      fontWeight: "bold",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(15)
    },
    cardContainer: {
      flex: 1,
      borderRadius: RFValue(10),
      justifyContent: "center",
      height: RFValue(110),
      marginBottom: RFValue(20)
    }
  });