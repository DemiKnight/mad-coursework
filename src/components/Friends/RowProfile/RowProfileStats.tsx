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
  const [numberOfPosts] = React.useState();
  const [numberOfPostsLoading] = React.useState(true);

  const [numberOfLikes] = React.useState();
  const [numberOfLikesLoading] = React.useState(true);

  const [errors] = React.useState(['Not implemented']);

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
