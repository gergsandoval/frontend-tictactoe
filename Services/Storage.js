import AsyncStorage from "@react-native-community/async-storage";

const googleId = "googleId";
const token = "token";
const name = "name";

export async function getGoogleId() {
  let value = null;
  try {
    value = await AsyncStorage.getItem(googleId);
  } catch (err) {
    console.log(err.message);
  }
  return value;
}

export async function setGoogleId(value) {
  try {
    await AsyncStorage.setItem(googleId, value);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getToken() {
  let value = null;
  try {
    value = await AsyncStorage.getItem(token);
  } catch (err) {
    console.log(err.message);
  }
  return value;
}

export async function setToken(value) {
  try {
    await AsyncStorage.setItem(token, value);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getName() {
  let value = null;
  try {
    value = await AsyncStorage.getItem(name);
  } catch (err) {
    console.log(err.message);
  }
  return value;
}

export async function setName(value) {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (err) {
    console.log(err.message);
  }
}
