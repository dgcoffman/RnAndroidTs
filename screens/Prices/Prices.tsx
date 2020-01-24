import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const locale = 'en-US';

const formatValue = ({amount, currency}) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);

const formatPercentChange = value =>
  new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));

const assetUrl =
  'https://www.coinbase.com/api/v2/assets/search?base=USD&filter=all&include_prices=false&limit=50&order=asc&query=&resolution=day&sort=rank';

const PriceRow = ({asset, navigation}) => {
  const value = formatValue(asset.latest_price.amount);
  const positive = Number.parseFloat(asset.percent_change) >= 0;
  return (
    <TouchableHighlight
      key={asset.id}
      onPress={() => navigation.navigate('Asset')}
      underlayColor="white">
      <View style={[layoutStyles.rowContainer, {}]}>
        <Image style={assetStyles.logo} source={{uri: asset.image_url}} />
        <View style={layoutStyles.column}>
          <Text style={assetStyles.name}>{asset.name}</Text>
          <Text style={assetStyles.symbol}>{asset.symbol}</Text>
        </View>
        <View style={[layoutStyles.column, {alignItems: 'flex-end'}]}>
          <Text style={{}}>{value}</Text>
          <Text
            style={[
              {},
              positive ? numberStyles.positive : numberStyles.negative,
            ]}>
            {positive ? '↑' : '↓'}
            {formatPercentChange(asset.percent_change * 100)}%
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Prices = props => {
  const [data, setData] = useState({hits: []});

  useEffect(() => {
    (async function fetchAssetData() {
      if (data.length) {
        return;
      }
      const response = await fetch(assetUrl);
      const responseJson = await response.json();
      console.log('got response', responseJson.data.length);
      setData(responseJson.data);
    })();
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={layoutStyles.scrollView}>
          <View style={layoutStyles.body}>
            {data.length &&
              data.map(asset => (
                <PriceRow navigation={props.navigation} asset={asset} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const numberStyles = StyleSheet.create({
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
});

const rowHorizontalSpacing = 12;

const layoutStyles = {
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  rowContainer: {
    borderColor: 'rgba(17, 51, 83, 0.3)',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: rowHorizontalSpacing,
    height: 72,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
  },
};

const assetStyles = {
  symbol: {
    fontSize: 12,
    fontWeight: '300',
    color: 'grey',
  },
  logo: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginRight: rowHorizontalSpacing,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
};

export default Prices;
