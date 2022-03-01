import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import {Divider, SearchBar, Switch, Text} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {search} from '../../../api/Search';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';
import {EmptyListPlaceholder} from '../../Common/EmptyListPlaceholder';
import CommonStyles from '../../Common/CommonStyles';
import {FriendSearchOptions} from './FriendSearchOptions';
import {mapErrors} from '../../../api/RequestUtils';
import {ErrorButton} from '../../Common/ErrorButton';

type FriendSearchProps = NativeStackScreenProps<FriendStackParams, 'Search'>;
export const FriendSearch = ({navigation}: FriendSearchProps) => {
  const [query, setQuery] = React.useState<string>('');
  const [isPublicSearch, setIsPublicSearch] = React.useState<boolean>(true);
  const [searchResults, setSearchResults] = React.useState<Array<PublicUser>>(
    [],
  );
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const [errors, setErrors] = React.useState<Array<string>>([]);

  const onRefresh = React.useCallback(async () => {
    async function getSearchResults() {
      const scope = isPublicSearch ? 'all' : 'friends';
      const request = await search(query, scope);
      if (request.intendedResult !== undefined) {
        setSearchResults(request.intendedResult);
      } else {
        setErrors(mapErrors(request.errors, 'Getting', 'Search results'));
      }
    }
    await getSearchResults();
    setRefreshing(false);
  }, [setRefreshing, isPublicSearch, query]);

  React.useEffect(() => {
    if (query?.trim() !== '') {
      onRefresh();
    } else {
      setSearchResults([]);
    }
  }, [query, isPublicSearch, onRefresh]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <SearchBar
        placeholder={`${isPublicSearch ? 'Public' : 'Friend'} search...`}
        platform="ios"
        // @ts-ignore
        onChangeText={(str: string) => setQuery(str)}
        value={query}
      />
      <View style={styles.publicSearchSlide}>
        <Text>Public Search</Text>
        <Switch
          value={isPublicSearch}
          onChange={() => setIsPublicSearch(!isPublicSearch)}
        />
        <ErrorButton errors={errors} />
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                onRefresh();
              }}
            />
          }
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
  wrapper: {
    flex: 1,
  },
  profileOptions: {
    flexDirection: 'row',
  },
  publicSearchSlide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    maxWidth: 230,
    padding: 5,
  },
  errorText: {
    color: 'red',
  },
});
