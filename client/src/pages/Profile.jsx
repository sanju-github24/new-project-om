import { useSelector } from "react-redux"
import { useRef } from "react";
export default function Profile() {
  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*"/>
        <img src={currentUser.profilePicture} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" onClick={()=> fileRef.current.click()}/>
        <input  defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3 "/>
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3 "/>
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3 "/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer ">Delete Account</span>
        <span className="text-red-500 cursor-pointer ">Sign out</span>
      </div>
    </div>
  )
}
