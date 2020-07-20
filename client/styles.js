import { StyleSheet, Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
 

export const pieColors = [
  "#EF4C22",
  "#f1dd6a",
  "#D4F2D2",
  "#B776B2",
  "#84A59D",
  "#262560",
  "#4F5DA9"
];
 
export const styles = StyleSheet.create({
 headerText: {
    alignSelf: 'center',
    paddingTop: 15,
    padding: 8,
    color: "#fc5185",
    fontWeight: 'bold',
    fontSize: 22,
 },
 container: {
   flexGrow: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: "white"
 },
 container1: {
  marginTop: 30,
  flexGrow: 1,
  paddingTop: 40,
  margin: 20
},
 logo: {
   width: 150,
   height: 108,
   resizeMode: 'contain',
 },
 buttontext: {
   textAlign: 'center',
   fontSize: 18,
 },
 text: {
   color: "white",
   fontWeight: 'bold',
   position: 'absolute',
 },
 introInfo: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 40
 },
 introIntroSmall: { 
   fontSize: 20, 
   color: '#ffffff', 
   textAlign: 'center' 
 },
 introInfoBig: { 
   fontSize: 40, 
   color: '#ffffff', 
   textAlign: 'center' 
  },
 slider: {
   marginLeft: 25,
   marginRight: 25,
   marginTop: 10,
   alignItems: 'stretch',
   justifyContent: 'center',
 },
 sliderTextAlign: {
   flexDirection: 'row',
   marginLeft: 25,
   marginRight: 25,
   justifyContent: 'space-between',
 },
 sliderSmallText: {
   alignSelf: 'center',
   color: "white",
   fontWeight: 'bold',
   fontSize: 12,
 },
 track: {
   height: 3,
   borderRadius: 1,
 },
 thumb: {
   width: 20,
   height: 20,
   borderRadius: 20 / 2,
   backgroundColor: 'white',
   shadowColor: 'black',
   shadowOffset: { width: 0, height: 2 },
   shadowRadius: 2,
   shadowOpacity: 0.35,
 },
 smallerText: {
   alignSelf: 'center',
   color: "#fc5185",
   fontWeight: 'bold',
   fontSize: 16,
 },
 categoryText: {
  alignSelf: 'center',
  color: '#000000',
  fontWeight: 'normal',
  fontSize: 16,
},
 editCategoryView: {
   paddingLeft: 20,
   paddingEnd: 20,
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
 homePageBudgetTextAlign: {
   flexDirection: 'row',
   width: '100%',
   left: 40,
   justifyContent: 'space-around',
   paddingTop: 10,
 },
 formContainer: {
   width: '80%',
   marginVertical: 10,
   height: 60,
   borderColor: "blue",
   backgroundColor: '#3947ad',
   borderWidth: 2,
   color: "white",
   fontSize: 18,
   paddingLeft: 20,
 },
 budgetContainer: {
   flexDirection: 'row',
   marginTop: 10,
   paddingLeft: 40,
 },
 budgetSetupContainer: {
   width: deviceWidth - 40,
   position: 'absolute',
   top: 50,
   alignItems: 'center',
 },
 budgetInput: {
   padding: 0,
   width: '95%',
   height: 45,
   borderColor: "grey",
   borderWidth: 1,
   color: "black",
   fontSize: 18,
   alignSelf: "center",
   borderRadius: 4,
 },

});
