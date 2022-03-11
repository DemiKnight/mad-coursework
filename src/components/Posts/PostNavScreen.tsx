import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PostsScreen} from '../Home/PostsScreen';
import {CreatePostsScreen} from './CreatePostsScreen';
import {DraftScreen} from './DraftScreen';
import {ScheduleScreen} from './ScheduleScreen';

export type PostStackNavParams = {
  View: undefined;
  Create: {userId?: number};
  Draft: undefined;
  Schedule: undefined;
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
    </PostStack.Navigator>
  );
};
