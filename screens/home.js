import React, {Component} from "react"
import {View,Text,StyleSheet,Image,Alert,TouchableOpacity} from "react-native"
import {Header,AirbnbRating,Icon} from "react-native-elements"
import {RFValue} from "react-native-responsive-fontsize"
import axios from "axios"

export default class Homescreen extends Component{

    constructor(){
        super()
        this.state = {
            articledetails : {},
        }
    }

    getarticle = () =>{
        const url = "http://localhost:5000/get-article"
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

    likedarticle = () => {
        const url = "http://localhost:5000/liked-article"
        axios.post(url).then(response =>{
            this.getarticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    unlikedarticle = () => {
        const url = "http://localhost:5000/unliked-article"
        axios.post(url).then(response =>{
            this.getarticle()
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    render(){
        const{articledetails}=this.state
        if (articledetails.url){
            const{
                url,title,text,rating
            } = articledetails
        }
        return(
            <View style = {StyleSheet.container}>
                <View style = {styles.headContainer}>
                    <Header
                    centerComponent = {{text:"articleRecommended",style:styles.headerTitle}}
                    rightComponent = {{icon:"search",color:"orange"}}
                    backgroundColor = {"purple"}
                    containerstyle = {{flex:1}}
                    />
                </View>
                <View style = {styles.subcontainer}>
                    <View style = {styles.subbottomcontainer}>
                        <View style = {styles.upperbottomcontainer}>
                            <Text style = {styles.title}>{title}</Text>
                            <Text style = {styles.subtitle}>{text}</Text>
                        </View>
                        <View style = {styles.middlebottomcontainer}>
                            <View style = {{flex: 0.3}}>
                                <AirbnbRating
                                count = {10}
                                reviews = {["","","","",""]}
                                defaultRating = {rating}
                                isDisabled = {true}
                                size = {RFValue(25)}
                                starContainerStyle = {{marginTop: -30}}
                                />
                            </View>
                            
                        </View>
                        <View style = {styles.lowerBottomContainer}>
                            <View style = {styles.iconButtonContainer}>
                                <TouchableOpacity
                                onPress={this.unlikedarticle}
                                >
                                    <Icon
                                reverse
                                name={"cross"}
                                type={"entypo"}
                                size={RFValue(30)}
                                color={"#ff1744"}
                                />
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={this.likedarticle}
                                >
                                    <Icon
                                reverse
                                name={"cross"}
                                type={"entypo"}
                                size={RFValue(30)}
                                color={"#76ff03"}
                                />
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    posterImage: {
      width: "60%",
      height: "90%",
      resizeMode: "stretch",
      borderRadius: RFValue(30),
      marginHorizontal: RFValue(10)
    },
    subBottomContainer: {
      flex: 0.6
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: RFValue(14),
      fontWeight: "300"
    },
    middleBottomContainer: {
      flex: 0.35
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      fontWeight: "300",
      color: "gray"
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    buttonCotainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold"
    }
  });