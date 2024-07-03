import { Client,Account,ID } from "appwrite";
import Config from '../../Config/Config.js';
export class auth{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(Config.appwriteUrl) // Your API Endpoint
        .setProject(Config.project_id);               // Your project ID
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log(error);
        }
    }
    async getAccount(){
        try {
           return await this.account.get(); 
        } catch (error) {
            console.log(error);
        }
    }
    async logout(){
        try {
           return await this.account.deleteSessions(); 
        } catch (error) {
            console.log(error);
        }
    }
}
const AuthService=new auth();
export default AuthService;