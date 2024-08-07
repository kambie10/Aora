import { Client, ID } from 'react-native-appwrite'

export const config = {
  endpoint: process.env.ENDPOINT,
  platform: process.env.PLATFORM,
  projectId: process.env.PROJECT_ID,
  databaseId: process.env.DATABASE_ID,
  userCollectionId: process.env.USER_COLLECTION_ID,
  videoCollectionId: process.env.VIDEO_COLLECTION_ID,
  storageId: process.env.STORAGE_ID,
}

console.log(config)

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
