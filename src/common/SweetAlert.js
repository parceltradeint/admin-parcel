import Swal from "sweetalert2";

export const successAlert = async (data, timer) => {
  return Swal.fire({
    allowOutsideClick: false,
    text: `${data || "Please added message from Admin"}`,
    icon: "success",
    showConfirmButton: false,
    timer: timer || 1000,
    timerProgressBar: true,
    customClass: {
      timerProgressBar: "red-bg",
    },
  });
};

export const errorAlert = async (data) => {
  return Swal.fire({
    text: `${data || "Something went wrong! Please try again later."}`,
    icon: "warning",
    confirmButtonColor: "#006EB8",
    confirmButtonText: `Ok`,
    allowOutsideClick: false,
  });
};
