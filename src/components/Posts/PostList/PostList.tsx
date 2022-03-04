import React from 'react';
import {Post, PublicUser} from '../../../services/utils/SpacebookRequests';
import {SafeAreaView, View, VirtualizedList} from 'react-native';
import Text from 'react-native-elements/dist/text/Text';

export const PostList = (props: {userId: number}) => {
  const [postList, setPostList] = React.useState<Array<Post>>([
    {
      post_id: 9,
      text: 'Post for me plz',
      timestamp: '2022-02-18T14:20:29.000Z',
      author: {
        user_id: 1,
        first_name: 'Alex',
        last_name: 'Knight',
        email: 'alex@alexknight.co.uk',
      },
      numLikes: 0,
    },
  ]);
  // React.useEffect(() => {});

  return (
    <SafeAreaView>
      <VirtualizedList<Post>
        renderItem={item => <Text>{item.item.text}</Text>}
        getItem={(data: Array<Post>, index) => data[index]}
        getItemCount={x => x.length}
        keyExtractor={(item, _) => String(item.post_id)}
        data={postList}
      />
    </SafeAreaView>
  );
};
