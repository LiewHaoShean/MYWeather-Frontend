import Swal from "sweetalert2";
 
const LoadingMsg = ({message}) => {
    Swal.fire({
        title: "Be patient!",
        text: message,
        icon: "info"
      });
};

export default LoadingMsg;