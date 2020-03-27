import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';



import styles from './styles';
import logoImg from '../../assets/logo.png';


export default function Detail() {

    const route = useRoute();

    const incident = route.params.incident;

    const navigation = useNavigation();
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de 
    ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;

    function navigateBack() { //Quando clicar na setinha volta para a página de incidentes
        navigation.goBack();
    }

    function sendMail() { //Redireciona para o email e cria o email
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() { //Abre o whatsapp para enviar a mensagem
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`); //DeepLinking para abrir o aplicativo passando como parâmetro o telefone e o texto já pré definido
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentTitle, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentDescription}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentTitle}>CASO:</Text>
                <Text style={styles.incidentDescription}>{incident.description}</Text>

                <Text style={styles.incidentTitle}>VALOR:</Text>
                <Text style={styles.incidentDescription}>{
                    Intl.NumberFormat('pt-BR', {
                        style: 'currency', currency: 'BRL'
                    }).format(incident.value)}</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}