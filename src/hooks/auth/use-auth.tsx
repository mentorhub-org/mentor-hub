// import { auth } from "@/lib/auth";
// import { Register } from "@/schema/auth";

// export default function useAuth() {
//   const { signIn, signUp } = auth.api.;

//   const registerFn = async ({
//     email,
//     firstName,
//     lastName,
//     password
//   }: Register) => {
//     const errorCodes = {
//       USER_ALREADY_EXISTS: 'user already registered'
//     };

//     const getErrorMessage = (code: string) => {
//       if (code in errorCodes) {
//         return errorCodes[code as keyof typeof errorCodes];
//       }
//       return '';
//     };

//     await signUp.email(
//       {
//         email,
//         name: `${firstName} ${lastName}`,
//         password,
//         callbackURL: 'http://localhost:5173/overview'
//       },
//       {
//         onSuccess: data => {
//           alert(JSON.stringify(data));
//         },
//         onError: error => {
//           alert(getErrorMessage(error.error.error));
//         }
//       }
//     );
//   };

//   const signInFn = async ({
//     email,
//     password,
//     rememberMe
//   }: {
//     email: string;
//     password: string;
//     rememberMe: boolean;
//   }) => {
//     await signIn.email(
//       {
//         email,
//         password,
//         rememberMe,
//         callbackURL: 'http://localhost:5173/overview'
//       },
//       {
//         onSuccess: data => {
//           alert(JSON.stringify(data));
//         },
//         onError: error => {
//           alert(error);
//         }
//       }
//     );
//   };

//   const githubSignIn = async () => {
//     await signIn.social(
//       {
//         provider: 'github',
//         callbackURL: 'http://localhost:5173/overview'
//       },
//       {
//         onSuccess: data => {
//           alert(JSON.stringify(data));
//         },
//         onError: error => {
//           alert(error);
//         }
//       }
//     );
//   };

//   const linkedInSignIn = async () => {
//     await signIn.social(
//       {
//         provider: 'linkedin',
//         callbackURL: 'http://localhost:5173/overview'
//       },
//       {
//         onSuccess: data => {
//           alert(JSON.stringify(data));
//         },
//         onError: error => {
//           alert(error);
//         }
//       }
//     );
//   };

//   const googleSignIn = async () => {
//     await signIn.social(
//       {
//         provider: 'google',
//         callbackURL: 'http://localhost:5173/overview'
//       },
//       {
//         onSuccess: data => {
//           alert(JSON.stringify(data));
//         },
//         onError: error => {
//           alert(error);
//         }
//       }
//     );
//   };

//   return { registerFn, githubSignIn, linkedInSignIn, googleSignIn, signInFn };
// }
