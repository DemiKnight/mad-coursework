import React from 'react';
import {SafeAreaView, View, VirtualizedList} from 'react-native';
import {Button, Chip, Input, Switch, Text} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';
import {search} from '../../../api/Search';
import {RowProfile} from '../RowProfile/RowProfile';

export const FriendSearch = () => {
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
              <Button
                title={'...'}
                onPress={() => console.log(`Reject ${item.item.user_id}`)}
              />
            }
          />
        )}
      />
    </SafeAreaView>
  );
};
