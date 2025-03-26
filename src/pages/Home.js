import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, emailVerification, addTodo, deleteTodo } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { todos } = useSelector(state => state.todos)
    const [animationParent] = useAutoAnimate()

    const [todo, setTodo] = useState('')

    const submitHandle = async e => {
        e.preventDefault()
        await addTodo({
            todo,
            uid: user.uid
        })
        setTodo('')
    }

    const handleDelete = async id => {
        await deleteTodo(id)
    }

    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate('/login', {
            replace: true
        })
    }

    const handleVerification = async () => {
        await emailVerification()
    }

    if (user) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3">
                        {user.photoURL && (
                            <img 
                              src={user.photoURL} 
                              className="w-12 h-12 object-cover aspect-square rounded-lg" 
                            />
                        )}
                        <h1 className="text-lg font-semibold text-gray-800">
                            Hoşgeldin, {user.displayName} ({user.email})
                        </h1>
                    </div>
                
                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-2 w-full md:w-auto">
                        <Link to="/settings" className="h-10 min-w-[100px] px-4 text-sm text-white flex items-center justify-center bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-all">
                            Ayarlar
                        </Link>

                        <button onClick={handleLogout} className="h-10 min-w-[120px] px-4 text-sm text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-all">
                            Çıkış yap
                        </button>

                        {!user.emailVerified && (
                            <button onClick={handleVerification} className="h-10 min-w-[150px] px-4 text-sm text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-all">
                                E-posta onayla
                            </button> 
                        )}
                    </div>
                </div>
                
                {/* TODO EKLEME FORMU */}
                <form className="flex flex-col md:flex-row gap-4 mt-6 max-w-lg mx-auto" onSubmit={submitHandle}>
                    <input 
                      type="text" 
                      placeholder="Todo yaz" 
                      value={todo}
                      onChange={e => setTodo(e.target.value)}
                      className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm" 
                    />
                    <button 
                      disabled={!todo} 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      Ekle
                    </button>
                </form>

                {/* TODO LİSTESİ */}
                <ul ref={animationParent} className="mt-6 space-y-3 max-w-lg mx-auto">
                    {todos.map(todo => (
                        <li key={todo.id} className="flex justify-between items-center rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700">
                            {todo.todo}
                            <button 
                              onClick={() => handleDelete(todo.id)} 
                              className="h-8 px-3 text-xs bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-all"
                            >
                                Sil
                            </button>
                        </li>
                    ))}
                    {todos.length === 0 && (
                        <li className="p-3 text-center rounded-lg bg-orange-100 text-orange-700">
                            Hiç todo eklemedin!
                        </li>
                    )}
                </ul>
            </div>
        );
    }

    return (
        <div className="flex justify-center space-x-4 mt-4">
            <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Kayıt ol
            </Link>
            <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Giriş yap
            </Link>
        </div>
    );
}