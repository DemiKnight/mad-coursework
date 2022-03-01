import React from 'react';
import {Button, Divider, Overlay, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';

export const ErrorButton = (props: {errors: Array<string>}) => {
  const [errorOverlayVisible, setErrorOverlayVisible] = React.useState(false);
  if (props.errors.length !== 0) {
    return (
      <>
        <Button
          type="outline"
          onPress={() => setErrorOverlayVisible(true)}
          icon={<Icon name="warning" color="red" size={20} />}
        />
        <Overlay
          isVisible={errorOverlayVisible}
          onBackdropPress={() => setErrorOverlayVisible(false)}>
          <Text>Errors</Text>
          {props.errors.map(errorStr => (
            <Text key={errorStr} style={styles.errorText}>
              {errorStr}
            </Text>
          ))}
        </Overlay>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
  },
});
