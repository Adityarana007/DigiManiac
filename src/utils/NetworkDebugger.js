import { Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NetworkLogger from "react-native-network-logger";
import { Colors } from "../assets/colors";

const NetworkDebugger = () => {
    const [showModal, setModalVisibility] = React.useState(false);
    return (
        <View>
            <TouchableOpacity
                onPress={() => setModalVisibility(true)}
                style={{ position: "absolute", bottom: 80, left: 20}}
            >
                <View
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40 / 2,
                        padding: 12,
                        backgroundColor: Colors.APP_COLOR_DARK,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>D</Text>
                </View>
            </TouchableOpacity>
            <Modal animationType="slide" visible={showModal} >
                <SafeAreaView />
                <TouchableOpacity onPress={() => setModalVisibility(false)} style={{ flexDirection: 'row', backgroundColor: "#2C79FF", justifyContent: 'center', padding: 12 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
                </TouchableOpacity>
                <NetworkLogger />
            </Modal>
        </View>
    );
};

export default NetworkDebugger;

