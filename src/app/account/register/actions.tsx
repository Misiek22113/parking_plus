'use server';

export async function register(formData: FormData) {
  console.log('register');
  console.log(formData.get('email'));
  console.log(formData.get('password'));
}
