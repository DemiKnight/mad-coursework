import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {Post} from '../../../services/utils/SpacebookRequests';
import Icon from 'react-native-vector-icons/AntDesign';
import {ProfileAvatar} from '../../Friends/RowProfile/ProfileAvatar';

enum LikeStatus {
  Liked,
  AlreadyLiked,
  NotLiked,
}

export const UserPost = (props: {post: Post}) => {
  const [postLikeStatus, setPostLikeStatus] = React.useState<LikeStatus>(
    LikeStatus.NotLiked,
  );

  const toggleLike = React.useCallback(async () => {
    if (postLikeStatus === LikeStatus.NotLiked) {
      setPostLikeStatus(LikeStatus.Liked);
    } else {
      setPostLikeStatus(LikeStatus.NotLiked);
    }
  }, [postLikeStatus]);

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
    <SafeAreaView style={styles.postWrapper}>
      <ProfileAvatar user={props.post.author} avatarSize="small" />
      <Text>{props.post.text}</Text>
      {likeButton}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    flexDirection: 'row',
  },
});
