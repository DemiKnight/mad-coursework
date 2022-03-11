import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {AppErrors, Post} from '../../../services/utils/SpacebookRequests';
import Icon from 'react-native-vector-icons/AntDesign';
import {ProfileAvatar} from '../../Friends/RowProfile/ProfileAvatar';
import {likePost, unlikePost} from '../../../api/Posting';
import {mapErrors} from '../../../api/RequestUtils';

enum LikeStatus {
  Liked,
  AlreadyLiked,
  NotLiked,
}

export const UserPost = (props: {post: Post}) => {
  const [postLikeStatus, setPostLikeStatus] = React.useState<LikeStatus>(
    LikeStatus.NotLiked,
  );
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [likeCount, setLikeCount] = React.useState<number>(props.post.numLikes);

  const toggleLike = React.useCallback(async () => {
    if (postLikeStatus === LikeStatus.NotLiked) {
      const request = await likePost(
        props.post.author.user_id,
        props.post.post_id,
      );
      if (request.intendedResult !== undefined) {
        setPostLikeStatus(LikeStatus.Liked);
        setLikeCount(likeCount + 1);
      } else {
        switch (request.errors) {
          case AppErrors.PostAlreadyLiked:
            setPostLikeStatus(LikeStatus.AlreadyLiked);
            break;
          default:
            setErrors(mapErrors(request.errors));
        }
      }
    } else {
      const request = await unlikePost(
        props.post.author.user_id,
        props.post.post_id,
      );
      if (request.intendedResult !== undefined) {
        setPostLikeStatus(LikeStatus.NotLiked);
        setLikeCount(likeCount - 1);
      } else {
        switch (request.errors) {
          case AppErrors.PostAlreadyUnliked:
            setPostLikeStatus(LikeStatus.NotLiked);
            break;
          default:
            setErrors(mapErrors(request.errors));
        }
      }
    }
  }, [
    postLikeStatus,
    props.post.author.user_id,
    props.post.post_id,
    likeCount,
  ]);

  let likeButton;
  if (postLikeStatus === LikeStatus.NotLiked) {
    likeButton = (
      <Button
        onPress={toggleLike}
        type="outline"
        icon={<Icon name="like2" size={20} />}
      />
    );
  } else if (postLikeStatus === LikeStatus.Liked) {
    likeButton = (
      <Button
        onPress={toggleLike}
        type="outline"
        icon={<Icon name="dislike2" size={20} />}
      />
    );
  } else {
    likeButton = (
      <Button
        onPress={toggleLike}
        type="outline"
        icon={<Icon name="dislike2" color="red" size={20} />}
      />
    );
  }

  return (
    <View style={styles.postWrapper}>
      <ProfileAvatar user={props.post.author} avatarSize="small" />
      <Text style={styles.postText}>{props.post.text}</Text>
      {likeButton}
      <Text style={styles.likesCounter}>{likeCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    flexDirection: 'row',
    width: 'auto',
    padding: 5,
  },
  postText: {},
  likeButton: {},
  likesCounter: {
    color: 'rgba(0,131,117,0.97)',
    marginLeft: 2,
  },
});
