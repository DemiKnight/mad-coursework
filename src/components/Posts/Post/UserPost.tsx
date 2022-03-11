import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {AppErrors, Post} from '../../../services/utils/SpacebookRequests';
import Icon from 'react-native-vector-icons/AntDesign';
import {ProfileAvatar} from '../../Friends/RowProfile/ProfileAvatar';
import {likePost, removePost, unlikePost} from '../../../api/Posting';
import {mapErrors} from '../../../api/RequestUtils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';
import {PostStackNavParams} from '../PostNavScreen';

enum LikeStatus {
  Liked,
  AlreadyLiked,
  NotLiked,
}

export const UserPost = (props: {post: Post; loggedInUserId?: number}) => {
  const [postLikeStatus, setPostLikeStatus] = React.useState<LikeStatus>(
    LikeStatus.NotLiked,
  );
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [likeCount, setLikeCount] = React.useState<number>(props.post.numLikes);
  const [isDeleted, setIsDeleted] = React.useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<PostStackNavParams>>();

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

  const deletePost = React.useCallback(async () => {
    const request = await removePost(
      props.post.author.user_id,
      props.post.post_id,
    );
    if (request.intendedResult !== undefined) {
      setIsDeleted(true);
    } else {
      setErrors(mapErrors(request.errors));
    }
  }, [props.post.author.user_id, props.post.post_id]);

  const editPost = React.useCallback(() => {
    // Will work, types not behaving or need to implement better.
    navigation.navigate('EditPost', {
      originalContent: props.post.text,
      originalPostId: props.post.post_id,
      originalUserId: props.post.author.user_id,
    });
  }, [
    navigation,
    props.post.text,
    props.post.post_id,
    props.post.author.user_id,
  ]);

  let likeButtonIcon;
  if (postLikeStatus === LikeStatus.NotLiked) {
    likeButtonIcon = <Icon name="like2" size={20} />;
  } else if (postLikeStatus === LikeStatus.Liked) {
    likeButtonIcon = <Icon name="dislike2" size={20} />;
  } else {
    likeButtonIcon = <Icon name="dislike2" color="red" size={20} />;
  }

  if (isDeleted) {
    return null;
  }

  return (
    <View style={styles.postWrapper}>
      <ProfileAvatar user={props.post.author} avatarSize="small" />
      <Text style={styles.postText}>{props.post.text}</Text>
      {props.post.author.user_id !== props.loggedInUserId && (
        <Button onPress={toggleLike} type="outline" icon={likeButtonIcon} />
      )}

      <Text style={styles.likesCounter}>{likeCount}</Text>
      {props.post.author.user_id === props.loggedInUserId && (
        <>
          <Button
            type="outline"
            icon={<Icon name="delete" size={20} />}
            onPress={deletePost}
          />
          <Button
            type="outline"
            icon={<Icon name="form" size={20} />}
            onPress={editPost}
          />
        </>
      )}
      <Button
        icon={<Icon name="eyeo" size={20} />}
        type="outline"
        onPress={() =>
          navigation.navigate('SinglePost', {
            userId: props.post.author.user_id,
            postId: props.post.post_id,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    flexDirection: 'row',
    width: 'auto',
    padding: 5,
  },
  postText: {
    maxWidth: 200,
  },
  likeButton: {},
  likesCounter: {
    color: 'rgb(0,131,117)',
    marginLeft: 2,
  },
});
