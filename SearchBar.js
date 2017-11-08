import React from "react";
import PropTypes from "prop-types";
import createClass from "create-react-class";
import { NativeModules, requireNativeComponent } from "react-native";

const RNSearchBar = requireNativeComponent("RNSearchBar", null);

class SearchBar extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    barTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    textColor: PropTypes.string,
    textFieldBackgroundColor: PropTypes.string,
    showsCancelButton: PropTypes.bool,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSearchButtonPress: PropTypes.func,
    onCancelButtonPress: PropTypes.func,
    enablesReturnKeyAutomatically: PropTypes.bool,
    hideBackground: PropTypes.bool,
    barStyle: PropTypes.oneOf(["default", "black"]),
    searchBarStyle: PropTypes.oneOf(["default", "prominent", "minimal"]),
    editable: PropTypes.bool
  };

  static defaultProps = {
    barStyle: "default",
    searchBarStyle: "default",
    editable: true
  };

  _onChange(e) {
    const { onChange, onChangeText } = this.props;
    if (typeof onChange === "function") {
      onChange(e);
    }
    if (typeof onChangeText === "function") {
      onChangeText(e.nativeEvent.text);
    }
  }

  _onPress = () => {
    const { onSearchButtonPress, onCancelButtonPress } = this.props;
    const button = e.nativeEvent.button;
    if (button === "search" && typeof onSearchButtonPress === "function") {
      return onSearchButtonPress(e.nativeEvent.searchText);
    } else if (
      button === "cancel" &&
      typeof onCancelButtonPress === "function"
    ) {
      return onCancelButtonPress();
    }
  };

  blur = () => {
    return NativeModules.RNSearchBarManager.blur(
      ReactNative.findNodeHandle(this)
    );
  };

  focus = () => {
    return NativeModules.RNSearchBarManager.focus(
      ReactNative.findNodeHandle(this)
    );
  };

  unFocus = () => {
    return NativeModules.RNSearchBarManager.unFocus(
      ReactNative.findNodeHandle(this)
    );
  };

  render() {
    return (
      <RNSearchBar
        style={{ height: NativeModules.RNSearchBarManager.ComponentHeight }}
        onChange={this._onChange}
        onPress={this._onPress}
        {...this.props}
      />
    );
  }
}

export default SearchBar;
