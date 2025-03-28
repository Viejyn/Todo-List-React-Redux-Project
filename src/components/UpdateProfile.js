import { useState } from "react";
import { update, resetPassword } from "../firebase";
import { useSelector } from "react-redux";
import { setUserData } from "../utils";


export default function UpdateProfile() {

    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName] = useState(user.displayName || '')
    const [avatar, setAvatar] = useState(user.photoURL || '')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        await update({
            displayName,
            photoURL: avatar
        })
        setUserData()
    }

    const handleResetSubmit = async e => {
        e.preventDefault()
        const result = await resetPassword(password)
        if (result) {
            setPassword('')
        }        
    }

    return (
        <div className="grid gap-y-10">
            <form onSubmit={handleSubmit} className="grid gap-y-4 py-4">
                <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ad-soyad
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="John Black"
                      value={displayName} onChange={e => setDisplayName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fotoğraf
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="John Black"
                      value={avatar} onChange={e => setAvatar(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button 
                    className="inline-flex disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                  >
                    Güncelle
                  </button>
                </div> 
            </form>

            <form onSubmit={handleResetSubmit} className="grid gap-y-4 py-4">
                <h1 className="text-xl font-bold mb-4">Şifreyi Güncelle</h1>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Şifre
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="password"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Değiştirmek istemiyorsanız, değiştirmeyin!"
                      value={password} onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button 
                    disabled={!password}
                    className="inline-flex disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                  >
                    Şifreyi Güncelle
                  </button>
                </div> 
            </form>

        </div>
        
    )
}