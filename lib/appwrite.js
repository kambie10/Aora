import { Account, Client, ID } from 'react-native-appwrite'
import { ENDPOINT, PLATFORM, PROJECT_ID, DATABASE_ID, USER_COLLECTION_ID, VIDEO_COLLECTION_ID, STORAGE_ID } from '@env'

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

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)

export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
      console.log(response)
    }, function (error) {
      console.log(error)
    })
}
