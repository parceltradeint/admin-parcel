// import Router, { useRouter } from "next/router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import OverlayLoading from "../components/common/OverlayLoading";

// const LoginAsUserComponent = () => {
//   const [processing, setProcessing] = useState(false);
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isValid },
//   } = useForm({
//     mode: "all",
//     defaultValues: { customToken: router.query.auth },
//   });

//   const onSubmit = async (data) => {
//     setProcessing(true);
//     const { customToken } = data;
//     await LoginAsUser(customToken)
//       .then((res) => {
//         setProcessing(false);
//         Swal.fire({
//           text: "Successfully logged in as user",
//           icon: "success",
//           confirmButtonColor: "#006EB8",
//           confirmButtonText: "Take me to the login screen",
//         }).then(() => {
//           Router.push("/jobs");
//         });
//       })
//       .catch((err) => {
//         setProcessing(false);
//         Swal.fire({
//           text: `${err.code}`,
//           icon: "error",
//           confirmButtonColor: "#006eb8",
//           confirmButtonText: `Ok`,
//           timerProgressBar: true,
//         });
//       });
//   };
//   if (processing) {
//     return <OverlayLoading />;
//   }
//   return (
//     <>
//       <div className="bg-gray-100 p-8">
//         <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
//           <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
//             Otul-Job Login as Employee
//           </h1>

//           <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <label
//                 htmlFor="token"
//                 className="block text-sm text-gray-800 dark:text-gray-200"
//               >
//                 Token
//               </label>
//               <input
//                 type="input"
//                 // readOnly={true}
//                 defaultValue={router?.query?.auth}
//                 name="customToken"
//                 // {...register("email", { required: true})}
//                 {...register("customToken")}
//                 className={`${
//                   errors.token
//                     ? "border border-errorColor"
//                     : "border border-eLightGray"
//                 } appearance-none block w-full px-3 py-2 xl:py-3 border border-gray-300 rounded-md focus:outline-none focus:text-eBlue focus:border-eBlue transition duration-150 ease-in-out text-base  placeholder-placeHolderColor xl:flex itms-center text-eDeepGray`}
//               />
//             </div>

//             <div className="mt-6">
//               <button
//                 type="submit"
//                 disabled={!isValid}
//                 className={`${
//                   !isValid ? " cursor-not-allowed" : "cursor-pointer "
//                 } w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600`}
//               >
//                 Login As Employee
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginAsUserComponent;

const LoginAsUserComponent = () => {
  return <p>Login user</p>;
};

export default LoginAsUserComponent;
