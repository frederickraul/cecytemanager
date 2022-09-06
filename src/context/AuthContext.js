import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,getAuth,sendPasswordResetEmail} from 'firebase/auth';
import { addDoc, collection, getDocs, deleteDoc, query, orderBy, where, doc, setDoc, getDoc, startAt, endAt } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../lib/firebase';

const AuthContext = createContext();


export const StateContext = ({ children }) => {
    const navigate = useNavigate();
    const [currentUser, setcurrentUser] = useState({rol:'guess'});
    const [isLoading, setisLoading] = useState(false);
    const [isAlertOpen, setisAlertOpen] = useState(false);
    const [alertMessage, setalertMessage] = useState('');
    const [alertSeverity, setalertSeverity] = useState('info');
    const [isGod, setisGod] = useState(false);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signout = () => {
        signOut(auth);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const deleteUser = (user) => {
        deleteUser(user).then(() => {
            // User deleted.
          }).catch((error) => {
            // An error ocurred
            // ...
          });
    }

    const handleCloseAlert = () =>{
        setisAlertOpen(false);
    } 

    const getData = async (collectionName, setdata,order) => {
        let collRef;
        let DATA;
        setisLoading(true);
        order ?
         collRef = query(collection(storage, collectionName), orderBy(order))
        :
         collRef = query(collection(storage, collectionName));
        await getDocs(collRef)
            .then(response => {
                switch(collectionName){
                   
                    case 'events':
                         DATA = response.docs.map(doc => ({
                            id: doc.id,
                            title: doc.data().title,
                            start: doc.data().start,
                            end: doc.data().end,
                            allDay: doc.data().allDay,
                            userName: doc.data().userName,
                            userId: doc.data().userId,
                        }));
                    break;
                    default:
                         DATA = response.docs.map(doc => ({
                            id: doc.id,
                           data: doc.data(),
                        }));

                }
                
                setdata(DATA);
                setisLoading(false);

            })
            .catch(error => {
                console.log(error);
                setisLoading(false);

            })
    }

    const getCurrentUserInfo = async (id) => {
        setisLoading(true);
        const DOC = await getDoc(doc(storage,'users',id));
        const userInfo = DOC.data();
        setisLoading(false);
        return userInfo;
    }


    const getDataById = async (collectionName, setdata,id) => {
        setisLoading(true);
        await getDoc(doc(storage,collectionName,id))
            .then(response => {
                setdata(response.data());
                setisLoading(false);
            })
            .catch(error => {
                console.log(error);
                setisLoading(false);

            })
    }

    const getDataWhere = async (collectionName, setdata, filter,condition, val,order) => {
        let collRef;
        setisLoading(true);
        condition === 'like' ? 
            collRef = query(collection(storage, collectionName), orderBy('nameLowercase'), startAt(val),endAt(val + '\uf8ff'))
            
        :
            order ? 
                collRef = query(collection(storage, collectionName), orderBy(order), where(filter, condition, val))
                :
                collRef = query(collection(storage, collectionName), where(filter, condition, val));



        await getDocs(collRef)
            .then(response => {
                const DATA = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setisLoading(false);
                setdata(DATA);

            })
            .catch(error => {
                setisLoading(false);
                console.log(error);
            })
    }

    const getDataWhereArray = async (collectionName, setdata, filter, condition, val) => {
        if(val.length < 1){
           return;
        }
        setisLoading(true);
        const collRef = query(collection(storage, collectionName), where(filter, condition, val),);
        await getDocs(collRef)
            .then(response => {
                const DATA = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setisLoading(false);
                setdata(DATA);

            })
            .catch(error => {
                setisLoading(false);
                console.log(error);
            })
    }

    const saveData = async (collectionName, data,to) => {
        setisLoading(true);
        const collRef = collection(storage, collectionName);
        const newDoc = await addDoc(collRef, data).then(response => {
            setalertMessage('El evento ha sido registrado.');
            setalertSeverity('success');
            setisAlertOpen(true);
            setisLoading(false);
            to && navigate(to);
            return response;
        }).catch(error => {
            console.log(error);
            setalertMessage('Upss algo salio mal.');
            setalertSeverity('error');
            setisAlertOpen(true);
            setisLoading(false);
            return error;
        });
        return newDoc.id;
    }

    const updateData = async (collectionName, data,id) => {
        if(!id){return}
        setisLoading(true);
        const collRef = doc(storage, collectionName, id);
        await setDoc(collRef, data).then(response => {
            setalertMessage('El evento ha sido actualizado.');
            setalertSeverity('success');
            setisAlertOpen(true);
            setisLoading(false);
            return response;
        }).catch(error => {
            console.log(error);
            setalertMessage('Upss algo salio mal.');
            setalertSeverity('error');
            setisAlertOpen(true);
            setisLoading(false);
            return error;
        });
    }

    const deleteData = async (collectionName,id) => {
            setisLoading(true);
            const collRef = doc(storage, collectionName, id);

            await deleteDoc(collRef);
            setalertMessage('El evento ha sido eliminado.');
            setalertSeverity('warning');
            setisAlertOpen(true);
            setisLoading(false);
    }

    const updateUserPassword = async(email) => {
        setisLoading(true);
        const auth = getAuth();
        auth.languageCode = 'es';
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setalertMessage('Revisa tu correo electronico para continuar con el cambio de contraseña.');
            setalertSeverity('success');
            setisAlertOpen(true);
            setisLoading(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setalertMessage('Upss algo salio mal.');
            setalertSeverity('error');
            setisAlertOpen(true);
            setisLoading(false);
            console.log(error);
        });
            


    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                getCurrentUserInfo(user.uid).then((userInfo) =>{
                    if(userInfo){
                        const userDATA = {
                            uid: user.uid,
                            email: user.email,
                            photo: userInfo.photo,
                            name: userInfo.name,
                            gender: userInfo.gender,
                            rol: userInfo.rol
                        }
                        if(userInfo.rol === 'god'){
                            setisGod(true);
                        }else{
                            setisGod(false);
                        }
                        setcurrentUser(userDATA);
                    }else{
                        const newUser ={
                            email: user.email,
                            name: user.email
                        }
                        const userDATA = {
                            uid: user.uid,
                            email: user.email,
                            email: user.email,
                            name: user.email,
                            rol: ''
                        }
                        updateData('users',newUser,user.uid,)
                        setcurrentUser(userDATA);
                    }
                });

            }else{
                setcurrentUser({rol: 'guess'});
            }

            
        });
        
           
    }, [])



    return (
        <AuthContext.Provider
            value={{
                isGod,
                signup,
                login,
                signout,
                deleteUser,
                deleteData,
                currentUser,
                isAlertOpen,
                alertMessage,
                alertSeverity,
                isLoading,
                setisLoading,
                setisAlertOpen,
                setalertMessage,
                setalertSeverity,
                handleCloseAlert,
                getData,
                getDataById,
                getDataWhere,
                getDataWhereArray,
                saveData,
                updateData,
                updateUserPassword,
            }}>
            {children}

        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);