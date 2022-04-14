import React, {Component} from 'react'
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

class AddPhoto extends Component {
    options = {
        saveToPhotos: true,
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600,
    }

    state = {
        uri: null,
        base64: null,
        comment: '',
    }

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
            launchCamera(this.options, (response) => {
                if (!response.didCancel) {
                    this.setState({ 
                        uri: response.assets[0].uri, 
                        base64: response.assets[0].data, 
                    })
                }
            });
        }
    }

    pickImage = () => {
        launchImageLibrary(this.options, (response) => {
            if (!response.didCancel) {
                this.setState({
                    uri: response.assets[0].uri,
                    base64: response.assets[0].data,
                })
            }
        })
    }

    save = async () => {
        Alert.alert('Imagem Adicionada', this.state.comment)
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: this.state.uri}}
                            style={styles.image} />                            
                    </View>
                    <TouchableOpacity onPress={this.pickImage}
                        style={styles.buttom}>
                        <Text style={styles.buttomText}>Escolha foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.captureImage}
                        style={styles.buttom}>
                        <Text style={styles.buttomText}>Abrir a Câmera</Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Algum comentário para a foto?'
                        style={styles.input} value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })} />
                    <TouchableOpacity onPress={this.save}
                        disabled={this.props.loading}
                        style={[styles.buttom, this.props.loading ? styles.buttonDisabled : null]}>
                        <Text style={styles.buttomText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
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
        backgroundColor: '#EEE',
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

export default AddPhoto