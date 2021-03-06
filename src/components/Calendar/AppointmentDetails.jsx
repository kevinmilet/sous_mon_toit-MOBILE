import React, {useState, useEffect, useContext, useCallback} from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Topbar from '../Topbar/Topbar';
import {deleteAptmt, showAptmt} from '../../API/ApiApointements';
import moment from 'moment';
import 'moment/locale/fr';
import colors from '../../utils/styles/colors'
import labels from "../../utils/labels";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import LogContext from '../../API/Context/LogContext';

const AppointmentDetails = ({ route }) => {

    const {aptmtId} = route.params;
    const dateFormat = 'DD/MM/YYYY à HH:mm';
    const {setTokenIsValid} = useContext(LogContext);
    const navigation = useNavigation();

    const [aptmtData, setAptmtData] = useState ({
        scheduled_at: '',
        address: '',
        zipcode: '',
        city: '',
        appointment_type: '',
        customerFirstname: '',
        customerLastname: '',
        notes: '',
        id: null,
        id_staff: null,
        id_customer: null
    });

    useEffect(() => {
        showAptmt(aptmtId)
            .then(
                response => {
                    if(response.response){
                        if(response.response.status === 401)
                        setTokenIsValid(false)
                    }
                    setAptmtData(response.data)
                }
            ).catch (error => {
                console.error(error.message)
            });
    }, [aptmtId])

    useFocusEffect(useCallback(() => {
        showAptmt(aptmtId)
            .then(
                response => {
                    if(response.response){
                        if(response.response.status === 401)
                            setTokenIsValid(false)
                    }
                    setAptmtData(response.data)
                }
            ).catch (error => {
            console.error(error.message)
        });
    }, [aptmtId]))

    const showDelAlert = () => {
        Alert.alert(
            labels.confirmation,
            labels.delConf,
            [
                {
                    text: "Non",
                    onPress: () => console.warn("Suppresion annulée"),
                    style: "cancel"
                },
                {
                    text: "Oui",
                    onPress: () => delAptmt(aptmtId),
                }
            ]
        );
    }

    const delAptmt = (aptmtId) => {
        deleteAptmt(aptmtId)
            .then(response => {
                    if (response.status === 200) {
                        confirmAlert()
                    } else {
                        errorAlert()
                    }
                }
            ).catch (error => {
                console.error(error.message)
        });
    };

    const confirmAlert = () => {
        Alert.alert(
            '',
            'Rendez-vous supprimé',
            [
                {
                    text: "Ok",
                    onPress: () => navigation.goBack()
                }
            ]
        );
    }

    const errorAlert = () => {
        Alert.alert(
            'Erreur',
            'Le rendez-vous n\'a pas été supprimé',
            [
                {
                    text: "Ok",
                    onPress: () => navigation.goBack()
                }
            ]
        );
    }

    return(
            <>
                <View>
                    <Topbar />
                </View>
                <ScrollView style={styles.main_container}>
                    <View style={styles.content_container}>
                        <View>
                            <Text style={styles.header}>Détails du Rendez-vous</Text>
                        </View>
                        <View>
                            <Text style={styles.date}>{moment(aptmtData.scheduled_at).format(dateFormat)}</Text>
                            <Text style={styles.type}>{aptmtData.appointment_type ?? ''}</Text>
                            <View>
                                <Text style={styles.title}>Nom du client / Contact</Text>
                                <Text style={styles.text}>{aptmtData.customerFirstname ?? 'Non renseigné'} {aptmtData.customerLastname ?? ''}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Bien</Text>
                                <Text>{aptmtData.reference ?? 'Non renseigné'} {aptmtData.title ?? ''}</Text>
                                <Text>{aptmtData.address ?? 'Non renseigné'} {aptmtData.zipcode ?? ''} {aptmtData.city ?? ''}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Notes</Text>
                                { aptmtData.notes !== null ?
                                    <Text style={styles.text}>{aptmtData.notes}</Text>
                                :
                                <Text style={styles.text}>Pas de notes</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.button_container}>
                            <TouchableOpacity onPress={() => navigation.navigate('editAppointment', { Appointment: aptmtData })}>
                                <MaterialCommunityIcons name="calendar-edit" color={colors.secondaryBtn} size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => showDelAlert()}>
                                <MaterialCommunityIcons name="trash-can-outline" color={colors.secondaryBtn} size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </>
    )
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
    },
    content_container: {
        borderRadius: 10,
        backgroundColor: colors.backgroundPrimary,
        margin: 10,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button_container: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop:25,
        marginBottom: 15
    },
    header: {
        justifyContent: 'center',
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary
    },
    date: {
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 22,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primaryBtn
    },
    type: {
        justifyContent: 'center',
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.secondaryBtn
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 3,
        color: colors.primary
    },
    text: {
        fontSize: 16,
        color: colors.primary
    }
})

export default AppointmentDetails;
