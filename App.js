import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,Image, StyleSheet } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://192.168.1.104/mediabox/api/read.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
       


      <View style={styles.container}>

<Text  style={{color:'#5a5c69', margin: 5 }} > All Movies </Text>
        <FlatList
          
          data={this.state.dataSource}
          renderItem={({item}) =>

<Image style={{ width: 150, height: 230 , margin: 5 }} source={{ uri: item.img_name }} />

           }
          keyExtractor={({mov_id}, index) => mov_id}
          numColumns={2} 
        />

      </View>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  
  },

//      text: {
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//    width: 'any',
//  backgroundColor: '#ff0000',
//  color: '#fff',
//   },
})
