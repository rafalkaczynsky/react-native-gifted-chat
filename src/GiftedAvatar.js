/*
**  This component will be published in a separate package
*/
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ChatAvatar from './ChatAvatar.tsx';

// TODO
// 3 words name initials
// handle only alpha numeric chars

export default class GiftedAvatar extends React.Component {
  setAvatarColor() {
    const userName = this.props.user.name || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) {
      this.avatarName = `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    } else {
      this.avatarName = '';
    }

    let sumChars = 0;
    for (let i = 0; i < userName.length; i++) {
      sumChars += userName.charCodeAt(i);
    }

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [
      '#e67e22', // carrot
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50' // midnight blue
    ];

    this.avatarColor = colors[sumChars % colors.length];
  }

  renderChatAvatar(userName, imageUrl, isStaff, avatarColor,isOnline) {
    return (
      <ChatAvatar
        height={50}
        width={50}
        style={{
          marginTop: 0,
          marginBottom: 9,
          marginLeft: 16,
          marginRight: 20,
          borderRadius: 25,
          backgroundColor: avatarColor
        }}
        textSize={16}
        isOnline={isOnline}
        userName={userName}
        src={imageUrl || 'https://ireview.live/img/no-user.png'}
        isGroupChat={false}
        isUserListItem={true}
        isStaff={isStaff}
      />
    );
  }

  renderAvatar() {
    const user = this.props.user;
    const userName = user.name;
    const imageUrl = null;
    const isStaff = user.isStaff;
    const avatarColor = user.avatarColor;
    const isOnline = user.isOnline

    return this.renderChatAvatar(userName, imageUrl, isStaff, avatarColor, isOnline);
  }

  renderInitials() {
    return (
      <Text style={[defaultStyles.textStyle, this.props.textStyle]}>
        {this.avatarName}
      </Text>
    );
  }

  renderOnlineCircle = isOnline => {
    let styles = isOnline
      ? { backgroundColor: '#68c700' }
      : {
          borderColor: '#c9c9c9',
          borderWidth: 1.5
        };
    return(<View styles={[styles.onlineCircle, styles]} />)

  };

  render() {
    if (!this.props.user.name && !this.props.user.avatar) {
      // render placeholder
      return (
        <View
          style={[
            defaultStyles.avatarStyle,
            { backgroundColor: 'transparent' },
            this.props.avatarStyle
          ]}
          accessibilityTraits="image"
        />
      );
    }
    if (this.props.user.avatar) {
      return (
        <TouchableOpacity
          disabled={this.props.onPress ? false : true}
          onPress={() => {
            const { onPress, ...other } = this.props;
            this.props.onPress && this.props.onPress(other);
          }}
          accessibilityTraits="image"
        >
          {this.renderAvatar()}
          {this.renderOnlineCircle(true)}
        </TouchableOpacity>
      );
    }

    if (!this.avatarColor) {
      this.setAvatarColor();
    }

    return (
      <TouchableOpacity
        disabled={this.props.onPress ? false : true}
        onPress={() => {
          const { onPress, ...other } = this.props;
          this.props.onPress && this.props.onPress(other);
        }}
        style={[
          defaultStyles.avatarStyle,
          { backgroundColor: this.avatarColor },
          this.props.avatarStyle
        ]}
        accessibilityTraits="image"
      >
        {this.renderInitials()}
        {this.renderOnlineCircle(true)}
        <Text>H</Text>
      </TouchableOpacity>
    );
  }
}

const defaultStyles = {
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textStyle: {
    color: '#fff',
    fontSize: 19,
    backgroundColor: 'transparent',
    fontWeight: '100'
  },
  onlineCircle:{  
    position: 'absolute',
    zIndex: 50,
    right: 16,
    bottom: 21,
    width: 8,
    height: 8,
    borderRadius: 4,
  }

};

GiftedAvatar.defaultProps = {
  user: {
    name: null,
    avatar: null
  },
  onPress: null,
  avatarStyle: {},
  textStyle: {}
};

GiftedAvatar.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
  avatarStyle: Image.propTypes.style,
  textStyle: Text.propTypes.style
};
