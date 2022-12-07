import React from "react";
import { useEffect } from "react";
import {Text, View, Image, StyleSheet} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions";
import { LoginButton } from "../LogButtons/LoginButton";
import { LogoutButton } from "../LogButtons/LogoutButton";

export const Profile = () => {
    const {user} = useAuth0();
    console.log(user)
    const dispatch = useDispatch()
    const userDb = useSelector(state => state.user)
    useEffect(()=>{
        if(user) dispatch(getUser(user.sub))
        console.log("esto es user db",userDb)
    },[])
    console.log(user)
    //console.log(user)
    return (
        <>
            <View style={styles.container}>
            {user ? (
                <View style={styles.info}>
                    <View>
                        <Text style ={styles.title}>Contact</Text>
                        <Text style ={styles.data}>Email: {user.email}</Text>
                        <Text style ={styles.data}>Nickname: {user.nickname}</Text>
                        <Image source={user.image} />
                    </View>
                    <View style={styles.boton}>
                        <LogoutButton />
                    </View>
                </View>
            )
            : (
                <View>
                <View>
                    <Text>Not logged in. Please log in</Text>
                </View>
                <View style={styles.botonIn}>
                    <LoginButton />
                </View>
                </View>
            )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection:"column",
        flexWrap:"wrap",
        height:"100%",
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        
       
    },
    title:{
        fontSize: 30
    },
    data:{
        fontSize:20,
        lineHeight: 40    
    },
    info: {
        width: '100%',
        fontSize: 30,
        justifyContent: "space-between",
    },
    boton: {
        width: 100,
        height: 100,

    },
    botonIn: {
        width: '100%',
        paddingTop: 15,
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
    },
})