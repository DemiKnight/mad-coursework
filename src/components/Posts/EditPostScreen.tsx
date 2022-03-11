import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from 'react-native-elements';
import {removePost, updatePost} from '../../api/Posting';
import {PostStackNavParams} from './PostNavScreen';
import {mapErrors} from '../../api/RequestUtils';

export type EditPostProps = NativeStackScreenProps<
  PostStackNavParams,
  'EditPost'
>;
export const EditPostScreen = ({route, navigation}: EditPostProps) => {
  const [postContent, setPostContent] = React.useState<string>(
    route.params.originalContent,
  );
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const updatePostContent = React.useCallback(async () => {
    const request = await updatePost(
      route.params.originalUserId,
      route.params.originalPostId,
      postContent,
    );
    if (request.intendedResult !== undefined) {
      navigation.navigate('SinglePost', {
        userId: route.params.originalUserId,
        postId: route.params.originalPostId,
      });
    } else {
      setErrors(mapErrors(request.errors));
    }
  }, [
    navigation,
    route.params.originalUserId,
    route.params.originalPostId,
    postContent,
  ]);

  const deletePost = React.useCallback(async () => {
    const request = await removePost(
      route.params.originalUserId,
      route.params.originalPostId,
    );

    if (request.intendedResult !== undefined) {
      navigation.navigate('View');
    } else {
      setErrors(mapErrors(request.errors));
    }
  }, [navigation, route.params.originalUserId, route.params.originalPostId]);

  return (
    <View style={styles.createPostWrapper}>
      <TextInput
        editable
        multiline
        numberOfLines={5}
        scrollEnabled={true}
        value={postContent}
        onChangeText={setPostContent}
        style={styles.textArea}
      />
      <View style={styles.createPostActions}>
        <Button title="Update" onPress={updatePostContent} />
        <Button title="Delete" onPress={deletePost} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createPostWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textArea: {
    padding: 5,
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});
