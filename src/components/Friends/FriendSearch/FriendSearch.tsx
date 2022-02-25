import React from 'react';
import {SafeAreaView, StyleSheet, View, VirtualizedList} from 'react-native';
import {
  Button,
  Chip,
  Input,
  SearchBar,
  Switch,
  Text,
} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {search} from '../../../api/Search';
import {RowProfile} from '../RowProfile/RowProfile';
import {Tooltip} from 'react-native-elements/dist/tooltip/Tooltip';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FriendStackParams} from '../FriendsNav';

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
      <Input
        placeholder="Search friend"
        autoCompleteType="off"
        onChangeText={setQuery}
      />
      <SearchBar
        placeholder={`${isPublicSearch ? 'Public' : 'Friend'} search...`}
        platform="ios"
        onChangeText={str => setQuery(str)}
        value={query}
      />
      <View>
        <Text>Public Search</Text>
        <Switch
          value={isPublicSearch}
          onChange={() => setIsPublicSearch(!isPublicSearch)}
        />
      </View>

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
              <Tooltip
                height={130}
                popover={
                  <SafeAreaView>
                    <Button
                      title="Profile"
                      onPress={() =>
                        navigation.navigate('Profile', {user: item.item})
                      }
                    />
                    {!isPublicSearch || (
                      <Button
                        title="Add Friend"
                        onPress={() => console.log('Add friend')}
                      />
                    )}
                  </SafeAreaView>
                }>
                {/*<Button title="..." />*/}
                <Text>...</Text>
              </Tooltip>
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlayWrapper: {
    flexDirection: 'column',
  },
});
