import React from 'react';
import {View, Image, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';

const url = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
    }

    this.fetchData = this.fetchData.bind(this);
    this.renderMovies = this.renderMovies.bind(this);
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.movies,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if(!this.state.movies) {
      return this.renderLoading();
    }
    return this.renderMovies(this.state.movies);
  }

  renderLoading() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator/>
      </View>
    );
  }

  renderMovies(movies) {
    return (
      <View>
        <FlatList
          data={movies}
          renderItem={this.renderMovie}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  renderMovie({item}) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: "http://www.gehooyeah.com/image/catalog/sheji/dianyinghaibao.jpg"}}/>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20
  },
  textContainer: {
    paddingLeft: 50,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 200,
  },
  title: {
    fontSize: 20,
  },
  year: {
    fontSize: 18,
    paddingTop: 10,
  },
})