import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(
        `${this.namespace}:accessToken`
    )

    return accessToken? accessToken : null

  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        accessToken
    )
    console.log (`token ${accessToken} has been stored`)
    
  }


  async removeAccessToken() {
    // Remove the access token from the storage

    await AsyncStorage.removeItem(
        `${this.namespace}:accessToken`
    )
    console.log("accessToken removed from device")
  }
}

export default AuthStorage;