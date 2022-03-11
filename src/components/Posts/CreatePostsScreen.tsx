import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostStackNavParams} from './PostNavScreen';
import {addNewPost} from '../../api/Posting';
import {mapErrors} from '../../api/RequestUtils';

type CreatePostProps = NativeStackScreenProps<PostStackNavParams, 'Create'>;
export const CreatePostsScreen = ({route, navigation}: CreatePostProps) => {
  const [newPostContent, setNewPostContent] = React.useState('');
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const createPost = React.useCallback(async () => {
    console.log(newPostContent);

    if (route.params.userId) {
      const request = await addNewPost(route.params.userId, newPostContent);
      if (request.intendedResult !== undefined) {
        navigation.navigate('View');
      } else {
        setErrors(mapErrors(request.errors));
      }
    }
  }, [newPostContent, route.params.userId, navigation]);

  const createDraftPost = React.useCallback(() => {
    console.log(newPostContent);
  }, [newPostContent]);

  const schedulePost = React.useCallback(() => {
    console.log(newPostContent);
  }, [newPostContent]);

  return (
    <View style={styles.createPostWrapper}>
      <TextInput
        editable
        multiline
        numberOfLines={5}
        scrollEnabled={true}
        value={newPostContent}
        onChangeText={setNewPostContent}
        placeholder="Create new post..."
        style={styles.textArea}
      />
      <View style={styles.createPostActions}>
        <Button title="Post" onPress={createPost} />
        <Button title="Save as Draft" onPress={createDraftPost} />
        <Button title="Schedule post" onPress={schedulePost} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createPostWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    // borderColor: '#808080',
    // borderWidth: 5,
    // justifyContent: 'flex-start',
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
    // alignSelf: 'flex-end',
    // flex: 1,
  },
});
