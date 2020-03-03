import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';

import { priceDisplay } from '../utils';
import ajax from '../ajax';

class DealDetail extends Component {

  static propTypes = {
    initialDealData: PropTypes.object.isRequired
  };

  async componentDidMount() {
    const fullDeal =  await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({ deal: fullDeal });
  }


  state = {
    deal: this.props.initialDealData
  };

  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <Image
          style={styles.image}
          source={{ uri: deal.media[0]}}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
          </View>
        </View>
        { deal.user && (
          <View>
            <Image source={{ uri: deal.user.avatar }} style={styles.avatar}/>
            <Text>{deal.user.name}</Text>
          </View>
        )}
        <View>
          <Text>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal:12,
    marginTop: 40,
    borderColor: '#bbb',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc'
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0
  },
  avatar: {
    height: 60,
    width: 60
  },
  cause: {
    flex: 2
  },
  price: {
    flex: 1,
    textAlign: 'right'
  }
})

export default DealDetail;
