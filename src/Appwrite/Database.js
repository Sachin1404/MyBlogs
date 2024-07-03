import Config from "../../Config/Config";
import { Client,Databases,Storage,Query,ID } from "appwrite"
export class dataService{
    client=new Client();
    database;
    bucket;
    constructor(){
        this.client
            .setEndpoint(Config.appwriteUrl)
            .setProject(Config.project_id);
            this.database=new Databases(this.client)
            this.bucket=new Storage(this.client)
    }
    async createPost({title,content,image_id,status,user_id,slug,authorname}){
        try {
            return await this.database.createDocument(
                Config.db_id,
                Config.collection_id,
                slug,
                {
                    title,
                    content,
                    image_id,
                    status,
                    user_id,
                    authorname
                }
            )
        } catch (error) {
            console.log( error);
            return false;
        }
    }
    async updatePost(slug,{title,content,image_id,status}){
        try {
            return await this.database.updateDocument(
                Config.db_id,
                Config.collection_id,
                slug,
                {
                    title,
                    content,
                    image_id,
                    status,
                }
            )
        } catch (error) {
            console.log( error);
            return false;
        }
    }
    async deletePost(slug){
       try {
        await this.database.deleteDocument(
            Config.db_id,
            Config.collection_id,
            slug
        )
        return true;
       } catch (error) {
        console.log(error);
        return false;
       }
    }
    async getPost(slug){
        try {
            return await this.database.getDocument(
                Config.db_id,
                Config.collection_id,
                slug
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async listPosts(){
        try {
            return await this.database.listDocuments(
                Config.db_id,
                Config.collection_id,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log( error);
            return false;
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                Config.bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log( error);
            return false;
        }
    }
    async deleteFile(file_id){
        try {
            await this.bucket.deleteFile(
                Config.bucket_id,
                file_id
            )
            return true;
        } catch (error) {
            console.log( error);
            return false;
        }
    }
    filePreview(file_id){
        try {
            return this.bucket.getFilePreview(
                Config.bucket_id,
                file_id
            )
        } catch (error) {
            console.log( error);
            return false;
        }
    }
}
const DataService=new dataService();
export default DataService;