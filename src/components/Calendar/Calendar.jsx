import React from 'react';
import { View, FlatList } from 'react-native';
import CalendarItem from './CalendarItem';

const DATA = [
    {
        id: '1',
        date: '2021-11-23 10:30:00',
        staff_id: '1',
        estate_address: '2 rue de la poupée qui tousse 80000 Amiens',
        customer: 'Jean Aymare',
        type: 'Visite',
        note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: '2',
        date: '2021-11-23 11:30:00',
        staff_id: '1',
        estate_address: '2 rue de la poupée qui tousse 80000 Amiens',
        customer: 'Jean Aymare',
        type: 'Première visite',
        note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: '3',
        date: '2021-11-23 14:00:00',
        staff_id: '1',
        estate_address: '2 rue de la poupée qui tousse 80000 Amiens',
        customer: 'Jean Aymare',
        type: 'Visite',
        note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
];

const Calendar = () => {

    const renderItem = ({ item }) => (
        <CalendarItem title={item.date} />
    );

    return(
        <View>
            <FlatList
                data={DATA}
                renderItem={({item}) => <CalendarItem appointments={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
    )
};

export default Calendar;