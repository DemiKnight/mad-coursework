import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostStackNavParams} from './PostNavScreen';
import {getPost} from '../../api/Posting';
import {Post} from '../../services/utils/SpacebookRequests';
import {mapErrors} from '../../api/RequestUtils';
import {Divider, Text} from 'react-native-elements';
import {ErrorButton} from '../Common/ErrorButton';
import {ProfileAvatar} from '../Friends/RowProfile/ProfileAvatar';
import {readableDateTiem} from '../../services/utils/UserUtils';
import {ProfileHeader} from '../Friends/FullProfile/ProfileHeader';

type SinglePostProps = NativeStackScreenProps<PostStackNavParams, 'SinglePost'>;
export const SinglePostScreen = ({route}: SinglePostProps) => {
  const [updatedPost, setUpdatedPost] = React.useState<Post>();
  const [errors, setErrors] = React.useState<Array<string>>([]);

  React.useMemo(async () => {
    const request = await getPost(route.params.userId, route.params.postId);
    if (request.intendedResult !== undefined) {
      setUpdatedPost(request.intendedResult);
    } else {
      setErrors(mapErrors(request.errors, 'Getting', 'Post'));
    }
  }, [route.params.userId, route.params.postId]);

  if (updatedPost) {
    return (
      <View style={styles.postWrapper}>
        <ErrorButton errors={errors} />
        <ProfileHeader user={updatedPost.author} avatarSize="large" />
        <View style={styles.postStatsWrapper}>
          <Text style={styles.likeText}>
            {updatedPost.numLikes.toLocaleString('en-GB', {
              notation: 'compact',
              compactDisplay: 'short',
              maximumSignificantDigits: 2,
            })}{' '}
            Likes
          </Text>
          <Text style={styles.dateText}>
            Posted: {readableDateTiem(updatedPost.timestamp)}
          </Text>
        </View>
        <Divider />
        <Text>{updatedPost.text}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <ErrorButton errors={errors} />
        <Text>Loading...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  postWrapper: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    padding: 5,
  },
  dateText: {
    color: '#808080',
    fontSize: 15,
  },
  likeText: {
    color: 'rgb(0,131,117)',
  },
  postStatsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
});
