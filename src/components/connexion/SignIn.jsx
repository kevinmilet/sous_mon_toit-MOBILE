import React, { useRef, forwardRef } from 'react';
import { TextInput as RNTextInput, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import colors from '../../utils/styles/colors';
import axios from 'axios';
import ApiRoutes from "../../utils/const/ApiRoutes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Entypo as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Button = ({ label, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                borderRadius: 8,
                height: 50,
                width: 245,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e94832'
            }}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text
                style={{ fontSize: 18, color: 'white', textTransform: 'uppercase' }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}
const TextInput = forwardRef(({ icon, error, touched, ...otherProps }, ref) => {
    const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                borderRadius: 8,
                borderColor: validationColor,
                borderWidth: StyleSheet.hairlineWidth,
                padding: 8
            }}
        >
            <View style={{ padding: 8 }}>
                <Icon name={icon} color={validationColor} size={16} />
            </View>
            <View style={{ flex: 1 }}>
                <RNTextInput
                    underlineColorAndroid='transparent'
                    placeholderTextColor='rgba(34, 62, 75, 0.7)'
                    ref={ref}
                    {...otherProps}
                />
            </View>
        </View>
    );
});

const SignIn = () => {

    // Fonction de test si le token est dans le storage AsyncStorage
    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('@auth:token')
            console.log(value);
            if (value !== null) {
                console.log('TOKEN = ' + value);
                alert('TOKEN = ' + value);
            }else{
                alert('pas de token')
            }
        } catch (e) {
            console.log('Failed to fetch the data from storage')
        }
    }
    const password = useRef(null);
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validationSchema: Yup.object({
            login: Yup.string()
                .required('Champ requis'),
            password: Yup.string()
                .required('Champ requis'),
        }),
        onSubmit: async (values) => {
            await new Promise(r => {
                login(values)
            })
            alert(`Login: ${values.login}, Password: ${values.password}`)
        }
    });

    const API_URL = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/';
    const login = (values) => {
        axios.post(API_URL + ApiRoutes.login, values)
            .then(res => {
                try {
                    AsyncStorage.setItem(
                        '@auth:token',
                        res.data.token
                    );
                } catch (error) {
                    console.log("Error saving data")
                    console.log(error);
                }
                // window.location.href = '/';
            }).catch(error => {
                console.log(error.message);
            })
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#000000',
            }}
        >
            {/* Logo */}
            <View
                style={{
                    flex: 2,
                    backgroundColor: '#999999',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image source={require('../../../assets/android-icon-192x192.png')} />
            </View>

            {/* Formulaire */}
            <View
                style={{
                    flex: 2,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={ styles.connexiontH1 }>
                    Connectez-vous
                </Text>
                <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                    <TextInput
                        icon='user'
                        placeholder='Entrer votre login'
                        autoCapitalize='none'
                        autoCompleteType='username'
                        keyboardType='default'
                        keyboardAppearance='dark'
                        returnKeyType='next'
                        returnKeyLabel='next'
                        onChangeText={handleChange('login')}
                        onBlur={handleBlur('login')}
                        error={errors.login}
                        touched={touched.login}
                        onSubmitEditing={() => password.current?.focus()}
                    />
                </View>
                <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                    <TextInput
                        icon='key'
                        placeholder='Entrer votre mot de passe'
                        secureTextEntry
                        autoCompleteType='password'
                        autoCapitalize='none'
                        keyboardAppearance='dark'
                        returnKeyType='go'
                        returnKeyLabel='go'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                        ref={password}
                        onSubmitEditing={() => handleSubmit()}
                    />
                </View>
                <Button label='Connexion' onPress={handleSubmit} />
                <Button label='data' onPress={readData} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    styledInput: {

    },
    connexionForm: {

    },

    connexiontH1: {
        color: colors.secondary,
        fontSize: 25,
        marginBottom: 16
    },
    connexionLabel: {

    },

})

export default SignIn;