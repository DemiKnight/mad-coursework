import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostStackNavParams} from './PostNavScreen';
import {getPost} from '../../api/Posting';
import {Post} from '../../services/utils/SpacebookRequests';
import {mapErrors} from '../../api/RequestUtils';
import {Text} from 'react-native-elements';

type SinglePostProps = NativeStackScreenProps<PostStackNavParams, 'SinglePost'>;
export const SinglePostScreen = ({route}: SinglePostProps) => {
  const [updatedPost, setUpdatedPost] = React.useState<Post>();
  const [errors, setErrors] = React.useState<Array<string>>([]);

  React.useMemo(async () => {
    const request = await getPost(route.params.userId, route.params.postId);
    if (request.intendedResult !== undefined) {
      setUpdatedPost(request.intendedResult);
    } else {
      setErrors(mapErrors(request.errors));
    }
  }, [route.params.userId, route.params.postId]);

  return (
    <View>
      <Text>xx</Text>
    </View>
  );
};
