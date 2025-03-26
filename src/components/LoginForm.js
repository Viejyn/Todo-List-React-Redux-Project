import { useState } from "react";

export default function LoginForm({ handleSubmit, noEmail = false }) {

    const [email, setEmail] = useState(noEmail ? true : '');
    const [password, setPassword] = useState('');

    const handle = e => {
        handleSubmit(e, email, password)
    }

    return(
        <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handle}>
            {!noEmail && (
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                   />
                </div>
              </div>
            )}
            

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="******"
                  value={password} onChange={e => setPassword(e.target.value)}
                 />
              </div>
            </div>

            <div>
              <button 
                disabled={!email || !password} 
                className="inline-flex disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Giriş yap
              </button>
            </div> 
        </form>
    );
}