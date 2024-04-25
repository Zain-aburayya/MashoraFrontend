/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CustomCheckbox = ({
  size = 25,
  fillColor = '#8A6F42',
  unFillColor = '#FFFFFF',
  text = '',
  iconStyle = {borderColor: 'red'},
  textStyle = {fontFamily: 'JosefinSans-Regular'},
  onPress,
  isChecked,
  style,
}) => {
  const textStyleWithDirection = {
    ...textStyle,
    marginRight: 20,
  };
  if (style === undefined) {
    style = {
      textAlign: 'right',
      flexDirection: 'row-reverse',
    };
  }
  return (
    <BouncyCheckbox
      style={style}
      size={size}
      fillColor={fillColor}
      unFillColor={unFillColor}
      text={text}
      iconStyle={iconStyle}
      textStyle={textStyleWithDirection}
      onPress={onPress}
      isChecked={isChecked}
    />
  );
};

export default CustomCheckbox;
