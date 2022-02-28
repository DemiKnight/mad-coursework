import React from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export const EmptyListPlaceholder = () => {
  return <Text style={styles.emptyListText}>Nothing here but us chickens</Text>;
};
const styles = StyleSheet.create({
  emptyListText: {
    color: '#808080',
    paddingTop: 100,
  },
});
