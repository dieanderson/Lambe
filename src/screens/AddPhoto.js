import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert,
    PermissionsAndroid,
} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'

import useEffectIf from '../hooks/UseEffectIf'
import useFeed from '../data/hooks/useFeed'
import useUser from '../data/hooks/useUser'
import useEvent from '../data/hooks/useEvent'

export default props => {
    const [image, setImage] = useState(null)
    const [comment, setComment] = useState('')

    const { addPost } = useFeed()
    const { name: nickname, email } = useUser()
    const { uploading } = useEvent()

    options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 800,
        maxHeight: 600,
    }

    const canEdit = () => (email != null && email.trim() != '') && !uploading

    requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA, {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                )
                return granted === PermissionsAndroid.RESULTS.GRANTED
            } catch (e) {
                console.warn(e)
                return false
            }
        } else return true
    }

    requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            )            
            return granted === PermissionsAndroid.RESULTS.GRANTED
          } catch (e) {
            console.warn(e)
            alert('Write permission err', e)
          }
          return false
        } else return true
    }

    captureImage = async () => {
        const isCameraPermitted = await this.requestCameraPermission()
        const isStoragePermitted = await this.requestExternalWritePermission()
        
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, response => {
                if (!response.didCancel) {
                    setImage({ uri: response.assets[0].uri, base64: response.assets[0].base64 })
                }
            })
        }
    }

    pickImage = () => {
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                setImage({ uri: response.assets[0].uri, base64: response.assets[0].base64 })
            }
        })
    }

    selectType = () => {
        if (!email) {
            Alert.alert('Atenção', noUser)
            return
        }
        Alert.alert('Selecione', 'Informe de onde você quer pegar a foto',
            [
                {
                    text: 'Galeria',
                    onPress: () => pickImage(),
                    style: 'default',
                },
                {
                    text: 'Camera',
                    onPress: () => captureImage(),
                    style: 'default',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => console.log('Tratar depois...')
            }
        )        
    }

    const save = () => {
        addPost({
            id: Math.random(),
            nickname,
            email,
            image,
            comments: [{nickname, comment}]
        })
    }

    useEffectIf(() => {
        setImage(null)
        setComment('')
        props.navigation.navigate('Feed')
    }, uploading, false)
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Compartilhe uma imagem</Text>
                <View style={styles.imageContainer}>
                    <Image key={new Date()} source={image} style={styles.image} />                            
                </View>
                <TouchableOpacity onPress={selectType}
                    disabled={!canEdit()}
                    style={[styles.buttom, canEdit() ? {} : styles.buttonDisabled]}>
                    <Text style={styles.buttomText}>Escolha a foto</Text>
                </TouchableOpacity>
                <TextInput placeholder='Adicione uma descrição para a foto...'
                    style={styles.input} value={comment}
                    editable={canEdit()}
                    onChangeText={setComment} />
                <TouchableOpacity onPress={save}
                    disabled={!canEdit()}
                    style={[styles.buttom, canEdit() ? {} : styles.buttonDisabled]}>
                    <Text style={styles.buttomText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 50 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#DDD',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    }
})