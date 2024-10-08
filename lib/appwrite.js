/* eslint-disable import/no-unresolved */
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite'
import {
  ENDPOINT,
  PLATFORM,
  PROJECT_ID,
  DATABASE_ID,
  USER_COLLECTION_ID,
  VIDEO_COLLECTION_ID,
  STORAGE_ID,
} from '@env'

export const config = {
  endpoint: ENDPOINT,
  platform: PLATFORM,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
  userCollectionId: USER_COLLECTION_ID,
  videoCollectionId: VIDEO_COLLECTION_ID,
  storageId: STORAGE_ID,
}

const client = new Client()

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)
    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)
    await signIn(email, password)

    const newUser = databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    )
    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ])

    if (!currentUser) throw Error
    return currentUser.documents[0]
  } catch (error) {
    throw new Error(error)
  }
}
