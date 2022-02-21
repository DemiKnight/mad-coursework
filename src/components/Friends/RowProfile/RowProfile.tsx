import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {Avatar, Button, Overlay, Text} from 'react-native-elements';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {initialsFromUser} from '../../../services/utils/UserUtils';

export const RowProfile = (target: PublicUser) => {
  const [profilePic, setProfilePic] = React.useState(undefined);
  const [postNumber, setPostNumber] = React.useState(2);
  const [likesNumber, setlikesNumber] = React.useState(33);
  const [optionsVisable, setOptionsVisable] = React.useState(false);

  React.useEffect(() => {}, [profilePic]);

  const toggleOptions = React.useCallback(() => {
    setOptionsVisable(!optionsVisable);
  }, [setOptionsVisable, optionsVisable]);

  console.log(target);

  return (
    <SafeAreaView style={styles.wrapper}>
      {profilePic === undefined ? (
        <Avatar
          overlayContainerStyle={{backgroundColor: 'blue'}}
          size={'medium'}
          rounded
          title={initialsFromUser(target)}
        />
      ) : (
        <Avatar
          rounded
          size={'medium'}
          source={{
            uri: 'https://picsum.photos/200/300',
          }}
        />
      )}
      <View style={styles.middleColumn}>
        <Text>
          {target.first_name} {target.last_name}
        </Text>
        <Text style={styles.emailText}>{target.email}</Text>
      </View>
      <View style={styles.middleColumn}>
        <Text>
          Posts: <Text style={styles.stat}>{postNumber}</Text>
        </Text>
        <Text>
          Likes: <Text style={styles.stat}>{likesNumber}</Text>
        </Text>
      </View>
      <View style={styles.optionButtonWrapper}>
        <Button
          title={'...'}
          buttonStyle={styles.optionsButton}
          onPress={toggleOptions}
        />
        <Overlay
          style={styles.overlayTest}
          isVisible={optionsVisable}
          onBackdropPress={toggleOptions}>
          <Button
            title={'View'}
            onPress={() => {
              console.log('View');
            }}
          />
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  middleColumn: {
    marginLeft: 4,
  },
  emailText: {
    color: '#808080',
  },
  stat: {
    fontWeight: 'bold',
  },
  optionsButton: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'center',
  },
  optionButtonWrapper: {
    alignItems: 'center',
    flexGrow: 1,
  },
  overlayTest: {
    flex: 20,
  },
});
