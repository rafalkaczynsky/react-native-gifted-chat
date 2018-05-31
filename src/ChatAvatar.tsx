import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

export interface ChatAvatarProps {
  isUserListItem: boolean;
  isGroupChat: boolean;
  userName: boolean;
  textSize: number;
  isStaff: boolean;
  style?: any;
  height: number;
  width: number;
  src: string;
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const AvatarInitials = styled.Text`
  color: #fff;
`;

const ChatAvatar: React.SFC<ChatAvatarProps> = props => {
  const renderAvatarImage = (src, isGroupChat, isUserListItem) => (
    <AvatarImage
      style={{
        width: isUserListItem ? '100%' : '70%',
        height: isUserListItem ? '100%' : '70%'
      }}
      source={
        isGroupChat
          ? null
          : {
              uri: src
            }
      }
    />
  );

  const getInitials = fullName => {
    const firstNameInitial = fullName ? fullName.charAt(0) : null;
    const lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
    const lastNameInitial = lastName ? lastName.charAt(0) : null;

    return (firstNameInitial + lastNameInitial).toUpperCase();
  };

  const renderInitials = (userName, textSize) => {
    return (
      <AvatarInitials style={{ fontSize: textSize }}>
        {getInitials(userName)}
      </AvatarInitials>
    );
  };

  return (
    <Container
      style={[
        {
          height: props.height,
          width: props.width,
          borderRadius: props.width / 2
        },
        props.style
      ]}
    >
      {props.isGroupChat &&
        renderAvatarImage(props.src, props.isGroupChat, props.isUserListItem)}
      {props.isUserListItem &&
        !props.isStaff &&
        renderAvatarImage(props.src, props.isGroupChat, props.isUserListItem)}
      {props.isStaff &&
        !props.isGroupChat &&
        renderInitials(props.userName, props.textSize)}
    </Container>
  );
};

export default ChatAvatar;
