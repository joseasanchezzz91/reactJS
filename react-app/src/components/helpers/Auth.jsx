import {firebaseAuth,ref} from '../../data/config'



const saveUser = (user)=>(
    ref
    .child(`users/${user.uid}/info`)
    .set({
        email: user.email,
        uid: user.uid
    })
    .then( ()=> user)
)


const auth = (email,password)=>(
    firebaseAuth().createUserWithEmailAndPassword(email,password)
    .then(saveUser)
)

const login = (email,password)=> firebaseAuth().signInWithEmailAndPassword(email,password)


const logout= ()=> firebaseAuth().signOut()


const resetPassword=()=> firebaseAuth().sendPasswordResetEmail()

export {
    resetPassword,
    saveUser,
    login,
    logout,
    auth
}