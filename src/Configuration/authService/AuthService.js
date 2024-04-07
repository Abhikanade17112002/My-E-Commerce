import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth" 
import { app } from "../Firebase";
class AuthService {
    auth ;

    constructor()
    {
        this.auth = getAuth() ;
      
    } 
    
    async signUpUser (userName,passWord)
    {
         try {
            const userAccount =   await createUserWithEmailAndPassword(this?.auth,userName,passWord)
            
           if( userAccount )
           {
               return this.signInUser(userName,passWord) ;
           }
           else
           {
             return userAccount
           }
        
         } catch (error) {
            console.log("Fire Base Error :: Sign Up User " , error) ;
         }
    }


    async signInUser ( userName , passWord )
    {
        try {
          return  await signInWithEmailAndPassword(this.auth,userName,passWord)
            

        } catch (error) {
           console.log("Fire Base Error :: Sign IN User " , error) ;
        }
    }
}


const authService = new AuthService() ;

export default authService ;