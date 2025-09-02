import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { Colors } from "../../../assets/colors";
import palette from "../../../assets/palette";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      alignItems: 'center',
    },
    logo: { fontSize: 22, fontWeight: 'bold', color: '#3F51B5' },
    profileIcon: { width: 36, height: 36, borderRadius: 18 },
    logoIcon: { width: 112, height: 32, borderRadius: 18 },
    searchBar: {
      backgroundColor: '#f1f1f1',
      marginHorizontal: 16,
      borderRadius: 10,
      padding: 10,
      flexDirection: 'row',
    },
    searchInput: {
      fontSize: 16,
      marginLeft: 10,
      fontFamily: fonts.montserratMedium
    },
    categories: {
      marginTop: 16,
      paddingLeft: 16,
      marginBottom: 4,
    },
    categoryItem: {
      alignItems: 'center',
      marginRight: 16,
    },
    categoryIcon: {
      width: 60,
      height: 60,
      backgroundColor: '#ddd',
      borderRadius: 30,
      // marginBottom: 8,
    },
    categoryText: {
      fontSize: 12,
      textAlign: 'center',
      fontFamily: fonts.montserratMedium,
      marginTop: 8

    },
    banner: {
      backgroundColor: '#ffe3ec',
      margin: 16,
      borderRadius: 12,
      flexDirection: 'row',
      padding: 12,
      alignItems: 'center',
    },
    bannerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#f44336',
    },
    subText: {
      fontSize: 14,
      color: '#555',
    },
    shopNowBtn: {
      marginTop: 10,
      backgroundColor: '#f44336',
      padding: 8,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    shopNowText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    bannerImg: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginLeft: 10,
    },
    dealBox: {
      backgroundColor: '#E3F2FD',
      margin: 16,
      borderRadius: 10,
      padding: 16,
    },
    dealTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    timer: {
      color: '#333',
      marginTop: 4,
    },
    viewAllBtn: {
      marginTop: 10,
      alignSelf: 'flex-start',
      padding: 6,
      paddingHorizontal: 12,
      backgroundColor: '#2196F3',
      borderRadius: 6,
    },
    viewAllText: {
      color: '#fff',
    },
    productGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      paddingBottom: 32,
    },
    productCard: {
      width: '45%',
      backgroundColor: '#f9f9f9',
      margin: 8,
      borderRadius: 10,
      padding: 10,
    },
    productImage: {
      height: 120,
      width: '100%',
      borderRadius: 8,
    },
    productTitle: {
      fontWeight: 'bold',
      fontSize: 14,
      marginVertical: 4,
    },
    productDesc: {
      fontSize: 12,
      color: '#555',
    },
    productPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 6,
    },
    oldPrice: {
      textDecorationLine: 'line-through',
      color: '#777',
      fontWeight: 'normal',
    },
    discount: {
      color: 'red',
      fontWeight: 'bold',
    },
    rating: {
      marginTop: 4,
      fontSize: 12,
      color: '#888',
    },
 

    cardpaddingHolder: {
      paddingTop: 0,
      paddingLeft: 20,
      paddingRight: 20,
  },
  mainCardView: palette.view.noMargincardView,
  parentView: palette.view.superParent,
  cardView: palette.view.roundcardView,
  shadowView: palette.view.shadowView,
});

export default styles;