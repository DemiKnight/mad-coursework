import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PostsScreen} from '../Home/PostsScreen';
import {CreatePostsScreen} from './CreatePostsScreen';
import {DraftScreen} from './DraftScreen';
import {ScheduleScreen} from './ScheduleScreen';
import {EditPostScreen} from './EditPostScreen';
import {SinglePostScreen} from './SinglePostScreen';

export type PostStackNavParams = {
  View: undefined;
  Create: {userId?: number};
  Draft: undefined;
  Schedule: undefined;
  EditPost: {
    originalContent: string;
    originalPostId: number;
    originalUserId: number;
  };
  SinglePost: {
    postId: number;
    userId: number;
  };
};

const PostStack = createNativeStackNavigator<PostStackNavParams>();

export const PostNavScreen = () => {
  return (
    <PostStack.Navigator initialRouteName="View">
      <PostStack.Screen
        name="View"
        component={PostsScreen}
        options={{headerTitle: 'Posts'}}
      />
      <PostStack.Screen name="Create" component={CreatePostsScreen} />
      <PostStack.Screen name="Draft" component={DraftScreen} />
      <PostStack.Screen name="Schedule" component={ScheduleScreen} />
      <PostStack.Screen name="EditPost" component={EditPostScreen} />
      <PostStack.Screen name="SinglePost" component={SinglePostScreen} />
    </PostStack.Navigator>
  );
};
