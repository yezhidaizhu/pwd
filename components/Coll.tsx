import React, { Component } from "react";
import { View, Text } from "react-native";
import Collapsible from "react-native-collapsible";
import { TouchableOpacity } from "react-native-gesture-handler";

class Coll extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  render() {
    const { collapsed } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.toggleExpanded}>
          <View>
            <Text>Single Collapsible</Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View>
            <Text>
              Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
              ribs
            </Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default Coll;
