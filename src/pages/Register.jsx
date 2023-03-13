import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import logo from '../img/WeChat.png';

const Register = () => {
    const [err, setErr] = useState(false);
    //   const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

    const handleSubmit = async (e) => {
            // setLoading(true);
        e.preventDefault();
        // console.log(e.target[0].value);
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        createUserWithEmailAndPassword(auth, email, password)
            // .then((userCredential) => {
            //     // Signed in 
            //     const user = userCredential.user;
            //     console.log(user);
            //     // ...
            // })
            // .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     // ..
            // });

        try {
                  //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

                  //Create a unique image name
                //   const date = new Date().getTime();
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(

                (error) => {
                    setErr(true);
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        try{
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        // create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    }catch(err){
                        console.log(err);
                        setErr(true);
                        // setLoading(false);
                    }
                      
                    });
                }
            );



                //   await uploadBytesResumable(storageRef, file).then(() => {
                //     getDownloadURL(storageRef).then(async (downloadURL) => {
                //       try {
                //         //Update profile
                //         await updateProfile(res.user, {
                //           displayName,
                //           photoURL: downloadURL,
                //         });
                //         //create user on firestore
                //         await setDoc(doc(db, "users", res.user.uid), {
                //           uid: res.user.uid,
                //           displayName,
                //           email,
                //           photoURL: downloadURL,
                //         });

                //         //create empty user chats on firestore
                //         await setDoc(doc(db, "userChats", res.user.uid), {});
                //         navigate("/");
                //       } catch (err) {
                //         console.log(err);
                //         setErr(true);
                //         setLoading(false);
                //       }
                //     });
                //   });
        } catch (err) {
            setErr(true);
        //     console.log(err);
        //         //   setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo"><img className="log" src={logo} alt=""/></span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Your First Name" />
                    <input type="email" placeholder="Enter Your email" />
                    <input type="password" placeholder="Enter Password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                        <span className="size">(File Size should be less than 300 KB)</span>
                    </label>
                    
                    <button>Sign up</button>
                    {/* disable loading */}
                    {/* {loading && "Uploading and compressing the image please wait..."} */}
                    {err && <span className="er">* Please Enter Correct Email or Password</span>}
                </form>
                <p>
                    You do have an account? <Link to="/login" className="link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;