// app/register/RegisterForm.tsx
// BAB 5 — Client Component: form registrasi menggunakan Server Action
'use client';

import { useActionState } from 'react';
import { registerUser }   from '@/actions/auth';
import type { FormState } from '@/types';

const initialState: FormState = { success: false, message: '' };

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.message && (
        <div className={`p-3 rounded-lg text-sm border ${
          state.success
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {state.success ? '✅ ' : '❌ '}{state.message}
        </div>
      )}

      {[
        { id:'name',     label:'Nama Lengkap', type:'text',     placeholder:'Nama kamu',         auto:'name' },
        { id:'email',    label:'Email',        type:'email',    placeholder:'nama@example.com',  auto:'email' },
        { id:'password', label:'Password',     type:'password', placeholder:'Minimal 8 karakter',auto:'new-password' },
      ].map(field => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
            {field.label}
          </label>
          <input
            id={field.id} name={field.id} type={field.type}
            required autoComplete={field.auto} placeholder={field.placeholder}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
          />
        </div>
      ))}

      <button type="submit" disabled={isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                   hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {isPending ? '⏳ Mendaftar...' : 'Daftar Sekarang'}
      </button>
    </form>
  );
}
