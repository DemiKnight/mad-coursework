import React from 'react';
import {
  AppErrors,
  Post,
  PublicUser,
} from '../../../services/utils/SpacebookRequests';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import {UserPost} from '../Post/UserPost';
import {getAllPosts} from '../../../api/Posting';
import {mapErrors} from '../../../api/RequestUtils';
import {Divider} from 'react-native-elements';

export const PostList = (props: {userId: number}) => {
  const [postList, setPostList] = React.useState<Array<Post>>([]);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const getData = React.useCallback(async () => {
    const result = await getAllPosts(props.userId);

    if (result.intendedResult !== undefined) {
      setPostList(result.intendedResult);
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

  return (
    <VirtualizedList<Post>
      renderItem={item => (
        <>
          <UserPost post={item.item} />
          <Divider />
        </>
      )}
      getItem={(data: Array<Post>, index) => data[index]}
      getItemCount={x => x.length}
      keyExtractor={(item, _) => String(item.post_id)}
      data={postList}
    />
  );
};
