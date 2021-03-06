/**
 *
 */

import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator
} from "react-native";
import firebase from "../config/firebase";
import {colors} from "../config/styles";

export default class SignUpScreen extends React.Component {
   state = {
      name: "",
      email: "",
      password: "",
      errorMessage: null,
      loading: false
   };

    handleSignUp = () => {
        this.setState({errorMessage: null, loading: true});
        const { name, email, password } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                this.setState({loading: false});
                return userCredentials.user.updateProfile({
                    displayName: name
                }).then(() => {
                    this.props.navigation.navigate("App");
                })
            })
            .catch((error) => this.setState({loading: false, errorMessage: error.message }));
    };

   render() {
      return (
         <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
         >
            <View style={styles.flexBox}>
               <Text style={styles.heading}>Sign up to get started!</Text>

               <View style={styles.errorContainer}>
                  {this.state.errorMessage && (
                     <Text style={styles.errorText}>
                        {this.state.errorMessage}
                     </Text>
                  )}
               </View>

               <View style={styles.form}>
                  <View>
                     <TextInput
                        style={styles.authInput}
                        autoCapitalize="none"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        placeholder="Full Name"
                     />
                  </View>

                  <View>
                     <TextInput
                        style={styles.authInput}
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Email"
                     />
                  </View>

                  <View style={styles.marginTop}>
                     <TextInput
                        style={styles.authInput}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder="Password"
                     />
                  </View>
               </View>

                <TouchableOpacity
                    style={styles.authButton}
                    onPress={this.handleSignUp}
                >
                    {this.state.loading ?
                        (<ActivityIndicator
                            size="large"
                            color={colors.white}/>)
                        :
                        (<Text style={styles.authButtonText}>Sign Up</Text>)
                    }

                </TouchableOpacity>

               <TouchableOpacity
                  style={styles.center}
                  onPress={() => this.props.navigation.navigate("SignIn")}>
                  <Text style={styles.redirectText}>
                     Already have an account? Sign In
                  </Text>
               </TouchableOpacity>
            </View>
         </TouchableWithoutFeedback>
      );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flexBox: {
        flex: 1,
        justifyContent: "center",
    },
    center: {
        alignItems: "center"
    },
    heading: {
        fontSize: 24,
        textAlign: "center",
    },
    errorContainer: {
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    errorText: {
        color: colors.error,
        fontSize: 13,
        textAlign: "center",
    },
    form: {
        marginTop: 15,
        marginHorizontal: 50,
    },
    authLabelText: {
        color: colors.lightText,
        fontSize: 11,
        textTransform: "uppercase",
    },
    authButtonText: {
        color: colors.white,
        fontSize: 16,
    },
    authInput: {
        borderBottomColor: colors.lightText,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        marginBottom: 30,
    },
    authButton: {
        marginHorizontal: 50,
        backgroundColor: colors.accent,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    signUpHere: {
        alignSelf: "center",
        marginTop: 32,
    },
    redirectText: {
        color: colors.mediumText,
        fontSize: 13,
    },
});
