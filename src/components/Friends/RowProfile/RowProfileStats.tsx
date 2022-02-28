import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native-elements';
import {PublicUser} from '../../../services/utils/SpacebookRequests';

export const RowProfileStats = (props: {
  user: PublicUser;
  containerStyling: StyleProp<ViewStyle>;
}) => {
  const [numberOfPosts, setNumberOfPosts] = React.useState();
  const [numberOfPostsLoading, setNumberOfPostsLoading] = React.useState(true);

  const [numberOfLikes, setNumberOfLikes] = React.useState();
  const [numberOfLikesLoading, setNumberOfLikesLoading] = React.useState(true);

  const [errors, setErrors] = React.useState(['Not implemented']);

  if (errors === []) {
    return (
      <View style={props.containerStyling}>
        <Text>
          Posts:{' '}
          <Text style={styles.stat}>
            {numberOfPostsLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              numberOfPosts
            )}
          </Text>
        </Text>
        <Text>
          Likes:{' '}
          <Text style={styles.stat}>
            {numberOfLikesLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              numberOfLikes
            )}
          </Text>
        </Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  stat: {
    fontWeight: 'bold',
  },
});
