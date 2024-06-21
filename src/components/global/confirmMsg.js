import Swal from "sweetalert2";

const ConfirmMsg = ({message}) => {
    Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, verify it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Verified!",
            text: "Your gmail has been verified successfully.",
            icon: "success"
          });
        }
    });
}

export default ConfirmMsg;