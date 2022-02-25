import React from 'react';
import {SafeAreaView, StyleSheet, VirtualizedList} from 'react-native';
import {RowProfile} from './Friends/RowProfile/RowProfile';
import {PublicUser} from '../services/utils/SpacebookRequests';
import {getFriendList} from '../api/Friends';
import {Button, Overlay} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from './Friends/FriendsNav';

type FriendsListProps = NativeStackScreenProps<FriendStackParams, 'List'>;
export const FriendsListScreen = ({navigation}: FriendsListProps) => {
  const [friendListData, setFriendListData] = React.useState<Array<PublicUser>>(
    [],
  );
  const [optionsVisible, setOptionsVisible] = React.useState(false);

  const toggleOptions = React.useCallback(() => {
    setOptionsVisible(!optionsVisible);
  }, [setOptionsVisible, optionsVisible]);
  // const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    async function dataFn() {
      getFriendList(1).then(response => {
        if (response.intendedResult !== undefined) {
          console.log(response.intendedResult);
          setFriendListData(response.intendedResult);
        } else {
          // TODO Handle failure cases
        }
      });
    }

    dataFn();
  }, [setFriendListData]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <VirtualizedList<PublicUser>
        data={friendListData}
        initialNumToRender={20}
        getItem={(data: Array<PublicUser>, index) => data[index]}
        keyExtractor={(item, _) => String(item.user_id)}
        getItemCount={x => x.length}
        renderItem={item => (
          <RowProfile
            target={item.item}
            optionsComponent={
              <>
                <Button
                  title={'...'}
                  buttonStyle={styles.optionsButton}
                  onPress={toggleOptions}
                />
                <Overlay
                  style={styles.overlayTest}
                  isVisible={optionsVisible}
                  onBackdropPress={toggleOptions}>
                  <Button
                    title={'View'}
                    onPress={() => {
                      setOptionsVisible(false);
                      navigation.navigate('Profile', {
                        user: item.item,
                      });
                    }}
                  />
                </Overlay>
              </>
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 7,
  },
  optionsButton: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'center',
  },
  overlayTest: {
    flex: 20,
  },
  item: {
    marginBottom: 2,
  },
});
