import React from 'react';
import {Post, PublicUser} from '../../../services/utils/SpacebookRequests';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import Text from 'react-native-elements/dist/text/Text';
import {UserPost} from '../Post/UserPost';
import {getAllPosts} from '../../../api/Posting';
import {mapErrors} from '../../../api/RequestUtils';

export const PostList = (props: {userId: number}) => {
  const [postList, setPostList] = React.useState<Array<Post>>([]);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const getData = React.useCallback(async () => {
    const result = await getAllPosts(props.userId);

    if (result.intendedResult !== undefined) {
      setPostList(result.intendedResult);
    } else {
      setErrors(mapErrors(result.errors, 'Getting', ''));
    }
  }, [props.userId]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <VirtualizedList<Post>
      renderItem={item => (
        <>
          <Text>{item.index}</Text>
          <UserPost post={item.item} />
        </>
      )}
      getItem={(data: Array<Post>, index) => data[index]}
      getItemCount={x => x.length}
      keyExtractor={(item, _) => String(item.post_id)}
      data={postList}
    />
  );
};

const styles = StyleSheet.create({
  postListWrapper: {
    borderColor: '#008000',
    borderWidth: 5,
    maxHeight: 300,
  },
});
