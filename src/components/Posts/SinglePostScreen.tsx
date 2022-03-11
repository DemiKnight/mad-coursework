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

  console.debug(updatedPost?.author);

  if (updatedPost) {
    return (
      <View style={styles.postWrapper}>
        <ErrorButton errors={errors} />
        <View style={styles.fullProfileHeader}>
          <ProfileAvatar user={updatedPost.author} avatarSize="large" />

          <View>
            <Text style={styles.nameText}>
              {updatedPost.author.user_givenname}{' '}
              {updatedPost.author.user_familyname}
            </Text>

            <Text style={styles.emailText}>
              {updatedPost.author.user_email}{' '}
              <Text style={styles.emailText}>
                ({updatedPost.author.user_id})
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.postStatsWrapper}>
          <Text style={styles.likeText}>
            {updatedPost.numLikes.toLocaleString('en-GB', {
              notation: 'compact',
              compactDisplay: 'short',
              maximumSignificantDigits: 2,
            })}{' '}
            Likes
          </Text>
          <Text style={styles.emailText}>
            Posted: {readableDateTiem(updatedPost.timestamp)}
          </Text>
        </View>
        <Divider />
        <Text>{updatedPost.text}</Text>
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

const styles = StyleSheet.create({
  postWrapper: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    padding: 5,
  },
  fullProfileHeader: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  avatarContainer: {
    backgroundColor: 'blue',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  emailText: {
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
