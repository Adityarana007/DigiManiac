import React from 'react'
import { View } from "react-native";

const Spacer = (props: { margin: number }) => {
    return <View style={{margin: props.margin}} />;
  };
  
  export {Spacer};