import React from 'react';
import {SafeAreaView, StyleSheet, View, VirtualizedList} from 'react-native';
import {Button, SearchBar, Switch, Text} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {search} from '../../../api/Search';
import {RowProfile} from '../RowProfile/RowProfile';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import Icon from 'react-native-vector-icons/AntDesign';
import {EmptyListPlaceholder} from '../../Common/EmptyListPlaceholder';

type FriendSearchProps = NativeStackScreenProps<FriendStackParams, 'Search'>;
export const FriendSearch = ({navigation}: FriendSearchProps) => {
  const [query, setQuery] = React.useState<string>('');
  const [isPublicSearch, setIsPublicSearch] = React.useState<boolean>(true);
  const [searchResults, setSearchResults] = React.useState<Array<PublicUser>>(
    [],
  );

  React.useEffect(() => {
    async function getSearchResults() {
      const scope = isPublicSearch ? 'all' : 'friends';
      const request = await search(query, scope);
      if (request.intendedResult !== undefined) {
        setSearchResults(request.intendedResult);
      } else {
        // TODO
      }
    }

    if (query?.trim() !== '') {
      getSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query, isPublicSearch]);

  // if (searchResults.length === 0) {
  //   return <EmptyListPlaceholder />;
  // }

  return (
    <SafeAreaView>
      <SearchBar
        placeholder={`${isPublicSearch ? 'Public' : 'Friend'} search...`}
        platform="ios"
        onChangeText={(str: string) => setQuery(str)}
        value={query}
      />
      <View>
        <Text>Public Search</Text>
        <Switch
          value={isPublicSearch}
          onChange={() => setIsPublicSearch(!isPublicSearch)}
        />
      </View>

      {searchResults.length === 0 ? (
        <EmptyListPlaceholder />
      ) : (
        <VirtualizedList<PublicUser>
          data={searchResults}
          initialNumToRender={20}
          getItem={(data: Array<PublicUser>, index) => data[index]}
          keyExtractor={(item, _) => String(item.user_id)}
          getItemCount={x => x.length}
          renderItem={item => (
            <RowProfile
              target={item.item}
              optionsComponent={
                <View style={styles.profileOptions}>
                  <Button
                    icon={<Icon name="eyeo" size={20} />}
                    type="outline"
                    onPress={() =>
                      navigation.navigate('Profile', {user: item.item})
                    }
                  />
                  <Button
                    icon={<Icon name="adduser" size={20} />}
                    type="outline"
                    onPress={() =>
                      navigation.navigate('Profile', {user: item.item})
                    }
                  />
                </View>
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   overlayWrapper: {
//     flexDirection: 'column',
//   },
// });

const styles = StyleSheet.create({
  profileOptions: {
    flexDirection: 'row',
  },
});
