import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

export interface ChatAvatarProps {
  isUserListItem: boolean;
  isGroupChat: boolean;
  isOnline: boolean;
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

const OnlineCircle = styled.View`
  padding: 2px;
  border-radius: 7;
  background-color: #ebebeb;
  position: absolute;
  bottom: 0;
  right: 0;
  zIndex: 50;
`;

const OnlineDot = styled.View`
  width: 10;
  height: 10;
  border-radius: 5;
  border-width: 2;
`;

const ChatAvatar: React.SFC<ChatAvatarProps> = props => {
  const renderAvatarImage = (src, isGroupChat, isUserListItem) => (
    <AvatarImage
      style={{
        width: 50,
        height: 50,
        borderRadius: 25
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

  const renderOnlineCircle = isOnline => {
    const offlineStyle = {
      borderColor: '#c9c9c9',
      backgroundColor: '#ebebeb'
    };

    const onlineStyle = {
      borderColor: '#68c700',
      backgroundColor: '#68c700'
    };
    const styles = isOnline ? onlineStyle : offlineStyle;
    return (
      <OnlineCircle>
        <OnlineDot style={styles} />
      </OnlineCircle>
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
      {renderOnlineCircle(props.isOnline)}
    </Container>
  );
};

export default ChatAvatar;
