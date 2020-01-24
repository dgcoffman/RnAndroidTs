import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

const locale = 'en-US';

const Asset = () => {
  // const [data, setData] = useState({hits: []});
  // useEffect(() => {
  //   (async function fetchAssetData() {
  //     if (data.length) {
  //       return;
  //     }
  //     const response = await fetch(assetUrl);
  //     const responseJson = await response.json();
  //     console.log('got response', responseJson.data.length);
  //     setData(responseJson.data);
  //   })();
  // });
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={layoutStyles.scrollView}>
          <View style={layoutStyles.body}>
            <Text>test</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const layoutStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
});

export default Asset;
