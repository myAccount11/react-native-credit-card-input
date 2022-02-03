import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
} from "react-native";

const s = StyleSheet.create({
  baseInputStyle: {
    borderRadius: 30,
    padding: 22,
    color: '#4C5961',
    zIndex: 2,
    borderWidth: 1,
  },
});

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    additionalInputProps: PropTypes.shape(TextInput.propTypes),
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    additionalInputProps: {},
  };

  componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "") onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid") onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const { label, value, placeholder, status, keyboardType,
            containerStyle, inputStyle, labelStyle, placeholderColor,
            additionalInputProps, focused, ...rest } = this.props;
    let borderColor = '#f5f5f5';
    if(status !== 'valid' && !focused && value) {
      borderColor = '#B38777';
    }
    if(focused) {
      borderColor = '#E3E3E3';
    }

    return (
      <TouchableOpacity onPress={this.focus}
        activeOpacity={0.99}>
        <View style={[containerStyle]}>
          { !!label && <Text style={[labelStyle]}>{label}</Text>}
          <TextInput ref="input"
            {...additionalInputProps}
            {...rest}
            keyboardType={keyboardType}
            autoCapitalise="words"
            autoCorrect={false}
            style={[
              s.baseInputStyle,
              inputStyle,
              {
                backgroundColor: focused ? '#F0F0F0' : '#F5F5F5',
                borderColor: borderColor,
              },
            ]}
            underlineColorAndroid="transparent"
            placeholderTextColor="#788D99"
            placeholder={placeholder}
            value={value}
            onFocus={this._onFocus}
            onChangeText={this._onChange} />
        </View>
      </TouchableOpacity>
    );
  }
}
