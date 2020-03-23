import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Button,
  Alert,
  Animated
} from 'react-native';
import { debounce } from 'lodash';

export class ListItem extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      slideAnim: new Animated.Value(100)
    }
  }
  componentDidMount() {
    Animated.timing(this.state.slideAnim, {
      toValue: 0,
      duration: 500,
      delay: this.props.delay
    }).start();
  }
  render() {
    return (
      <Animated.View style={{marginLeft: this.state.slideAnim, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{uri: this.props.item.Poster}} style={styles.poster} /> 
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{this.props.item.Title}</Text> 
          <Text style={styles.subHeading}>
            {this.props.item.Type} - {this.props.item.Year} 
          </Text>
        </View>
      </Animated.View>
    )
  }
}

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      errorStr: null,
    }
    this.searchText = ''
    this.searchMovies = this.searchMovies.bind(this);
  }

  // searchMovies1 = debounce(self.searchMovies, 500);

  searchMovies() {
    if (this.searchText == '') {
      Alert.alert('please input search text!');
      return;
    }
    console.log('start search: ' + this.searchText);
    fetch('http://www.omdbapi.com/?apikey=79641377&s=' + this.searchText)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        if ('Search' in responseData) {
          this.setState({
            movies: responseData.Search,
            errorStr: null,
          })
        } else {
          this.setState({
            movies: null,
            errorStr: responseData.Error,
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    // this.searchText = 'sfasdfwefsdfs';
    this.searchText = 'avengers';
    this.searchMovies();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <TextInput
            style={{ height: 40, flex: 1, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => { this.searchText = text; }}
            placeholder="Enter search keyword"
          />
          <Button onPress={this.searchMovies} style={styles.btn} title='search' />
        </View>
        {
          this.state.movies &&
          <FlatList
            data={this.state.movies}
            renderItem={({item, index}) => <ListItem item={item} delay={index * 50}/>}
            keyExtractor={(item, index) => index}
          />
        }
        {
          this.state.errorStr &&
          <Text style={styles.title}>{this.state.errorStr}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  },
  poster: {
    height: 75,
    width: 50
  },
  title: {
    margin: 5,
    fontSize: 15
  },
  subHeading: {
    margin: 5,
    fontSize: 12
  },
  btn: {
    width: 40,
    height: 40,
  }
});
