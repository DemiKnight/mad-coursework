import React from 'react';
import {
  AppErrors,
  Post,
  PublicUser,
} from '../../../services/utils/SpacebookRequests';
import {RefreshControl, StyleSheet, View, VirtualizedList} from 'react-native';
import {UserPost} from '../Post/UserPost';
import {getAllPosts} from '../../../api/Posting';
import {mapErrors} from '../../../api/RequestUtils';
import {Divider} from 'react-native-elements';
import Keychain from 'react-native-keychain';

export const PostList = (props: {userId: number}) => {
  const [postList, setPostList] = React.useState<Array<Post>>([]);
  const [loggedInUserId, setLoggedinUserId] = React.useState<number>();
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const getData = React.useCallback(async () => {
    const result = await getAllPosts(props.userId);

    if (result.intendedResult !== undefined) {
      setPostList(result.intendedResult);
      setRefreshing(false);
    } else {
      switch (result.errors) {
        case AppErrors.PostVisibility:
          // Not an error, just don't render the list
          break;
        default:
          setErrors(mapErrors(result.errors, 'Getting', 'Posts'));
      }
    }
  }, [props.userId]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  React.useMemo(async () => {
    if (!loggedInUserId) {
      const retrieveID = await Keychain.getGenericPassword();
      if (retrieveID) {
        setLoggedinUserId(parseInt(retrieveID.username, 10));
      }
    }
  }, [loggedInUserId]);

  return (
    <VirtualizedList<Post>
      renderItem={item => (
        <>
          <UserPost post={item.item} loggedInUserId={loggedInUserId} />
          <Divider />
        </>
      )}
      getItem={(data: Array<Post>, index) => data[index]}
      getItemCount={x => x.length}
      keyExtractor={(item, _) => String(item.post_id)}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getData();
          }}
        />
      }
      data={postList}
    />
  );
};
