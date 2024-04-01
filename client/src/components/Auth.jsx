import { useState } from "react";
import Cookies from "universal-cookie";
import { VscSignIn } from "react-icons/vsc";
import { SiGnuprivacyguard } from "react-icons/si";
import { Button, Label, TextInput } from "flowbite-react";

const initialState = {
    fullName : '',
    username  : '',
    mobileNumber : '',
    password : '',
    confirmPassword : '',
};

export default function Autho() {
    const [  isSignup , setIsSignup ] = useState(true);
    const [ formData , setFormData ] = useState(initialState);
    const cookie = new Cookies();
    //handle form input data
    const handleChange = (e)=> {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        });
    }


    //handle switch from signup to signin
    const handleSwitchMode = ()=> {
        setIsSignup((prev)=> !prev);
    }

    //handle submit data
    const handleSubmit = async(e)=> {
        e.preventDefault();
        try {
            const response = await fetch(
                `/api/user/${isSignup ? 'signup': 'login'}`,
                {
                    method : "POST",
                    headers : { "Content-Type" : "application/json" },
                    body : JSON.stringify({user : formData})
                }
            );
            const data = await response.json();
            console.log(data);
            if(response.ok) {
                cookie.set("token", data.token);
                cookie.set('username', data.user.username);
                cookie.set("fullName", data.user.fullName);
                cookie.set("userId", data.user._id);
                cookie.set("avatar" , data.user.avatar);

                if(isSignup) {
                    cookie.set("token", data.token);
                    cookie.set("username", data.user.username);
                    cookie.set("fullName", data.user.fullName);
                    cookie.set("userId", data.user._id);
                    cookie.set("mobileNumber" , data.user.mobileNumber);
                    cookie.set("avatar" , data.user.avatar);
                }
                window.location.reload();
            }
        }catch(err) {console.log(err.message);}
    }
    return (
        <div className="bg-blue-600 w-full h-full min-h-screen" >
            <div className="md:w-[50%] bg-white min-h-screen relative" >
                <p className="text-2xl font-mono font-bold leading-8 text-center py-8" >{ isSignup ? 'Sign up'  : 'Sign in' }</p>
                <span className="inline-block absolute top-3 right-3 border border-black rounded-full p-2" >{ isSignup ? <SiGnuprivacyguard size={26} /> : <VscSignIn size={26} /> }</span>
                <div className="p-6" >
                    <form onSubmit={handleSubmit}>
                        { isSignup &&  (
                            <div>
                                <Label htmlFor="fullName">Full Name</Label>
                                <TextInput id="fullName" name="fullName" type="text" placeholder="full name" onChange={handleChange} required />
                            </div>
                        )}
                         <div>
                            <Label htmlFor="username">Username</Label>
                            <TextInput id="username" name="username" type="text" placeholder="username" onChange={handleChange} required />
                        </div>
                        { isSignup &&  (
                            <div>
                                <Label htmlFor="mobileNumber">Mobile Number</Label>
                                <TextInput id="mobileNumber" name="mobileNumber" type="number" placeholder="Mobile Number" onChange={handleChange} required />
                            </div>
                        )}
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <TextInput id="password" name="password" type="password" placeholder="***********" onChange={handleChange} required />
                        </div>
                        { isSignup && (
                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <TextInput id="confirmPassword" name="confirmPassword" type="password" placeholder="***********" onChange={handleChange} required />
                            </div>
                        ) }
                         <Button 
                            gradientDuoTone={"purpleToBlue"} 
                            outline 
                            type="submit"
                            className="my-4 w-full"

                        >{isSignup ? 'Ragister' : 'Log In'}</Button>
                    </form>
                    <div className="my-6" >
                        <p className="text-sm" >
                            { isSignup ? "Already have an account?" : "Don't have an account?" }
                            <span onClick={handleSwitchMode} className="text-blue-600 cursor-pointer hover:underline ml-4">
                                { isSignup ? 'Sign In' : 'Sign Up' }
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}