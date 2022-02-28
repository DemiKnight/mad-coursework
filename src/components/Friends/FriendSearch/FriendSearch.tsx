import React from 'react';
import {SafeAreaView, StyleSheet, View, VirtualizedList} from 'react-native';
import {Divider, SearchBar, Switch, Text} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {search} from '../../../api/Search';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {EmptyListPlaceholder} from '../../Common/EmptyListPlaceholder';
import CommonStyles from '../../Common/CommonStyles';
import {FriendSearchOptions} from './FriendSearchOptions';

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

  return (
    <SafeAreaView>
      <SearchBar
        placeholder={`${isPublicSearch ? 'Public' : 'Friend'} search...`}
        platform="ios"
        onChangeText={(str: string) => setQuery(str)}
        value={query}
      />
      <View style={styles.publicSearchSlide}>
        <Text>Public Search</Text>
        <Switch
          value={isPublicSearch}
          onChange={() => setIsPublicSearch(!isPublicSearch)}
        />
      </View>
      <Divider />

      {searchResults.length === 0 ? (
        <View style={CommonStyles.centreColumn}>
          <EmptyListPlaceholder />
        </View>
      ) : (
        <VirtualizedList<PublicUser>
          data={searchResults}
          initialNumToRender={20}
          getItem={(data: Array<PublicUser>, index) => data[index]}
          keyExtractor={(item, _) => String(item.user_id)}
          getItemCount={x => x.length}
          renderItem={item => (
            <FriendSearchOptions
              isPublicSearch={isPublicSearch}
              nav={navigation}
              user={item.item}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileOptions: {
    flexDirection: 'row',
  },
  publicSearchSlide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    maxWidth: 200,
    padding: 5,
  },
});
