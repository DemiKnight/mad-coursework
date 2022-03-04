import React from 'react';
import {Post, PublicUser} from '../../../services/utils/SpacebookRequests';
import {SafeAreaView, View, VirtualizedList} from 'react-native';
import Text from 'react-native-elements/dist/text/Text';
import {UserPost} from '../Post/UserPost';

export const PostList = (props: {userId: number}) => {
  const [postList, setPostList] = React.useState<Array<Post>>([
    {
      post_id: 9,
      text: 'Post for me plz',
      timestamp: '2022-02-18T14:20:29.000Z',
      author: {
        user_id: 1,
        user_givenname: 'Alex',
        user_familyname: 'Knight',
        user_email: 'alex@alexknight.co.uk',
      },
      numLikes: 0,
    },
  ]);
  // React.useEffect(() => {});

  return (
    <SafeAreaView>
      <VirtualizedList<Post>
        renderItem={item => <UserPost post={item.item} />}
        getItem={(data: Array<Post>, index) => data[index]}
        getItemCount={x => x.length}
        keyExtractor={(item, _) => String(item.post_id)}
        data={postList}
      />
    </SafeAreaView>
  );
};
