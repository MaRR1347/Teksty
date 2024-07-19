import { Client, Databases} from "react-native-appwrite";

const Config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.marr.teksty",
    projectId: "667d4fd2003c3bb228b2",
    databaseId: "667d55090036f146599a",
    songCollectionId: "667d55fd001c5c3c9408",
    storageId: "667d57cc0025225c019f"
}

export const client = new Client()
.setEndpoint(Config.endpoint)
.setProject(Config.projectId);

export const databases = new Databases(client);

export default Config;