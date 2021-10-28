import { base } from 'config/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';

interface IAppButton extends ButtonProps {
  backgroundColor?: string;
}
export const AppButton = (props: IAppButton) => {
  const {
    icon,
    backgroundColor = '#1AB9B8',
    title,
    buttonStyle,
    ...rest
  } = props;
  return (
    <Button
      activeOpacity={0.7}
      containerStyle={{marginTop: 20}}
      buttonStyle={[
        StyleSheet.flatten([
          {
            backgroundColor: backgroundColor,
            paddingVertical: `${base}%`,
            borderRadius: 10,
          },
          buttonStyle,
        ]),
      ]}
      titleStyle={{
        fontSize: 16,
        letterSpacing: 1.3,
      }}
      title={title}
      icon={icon}
      {...rest}
    />
  );
};
