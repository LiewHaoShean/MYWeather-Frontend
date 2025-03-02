import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrAction } from "../../redux/slices/globalAction/globalActions";

const ErrorMsg = ({ message }) => {
    const dispatch = useDispatch();
    Swal.fire({
        icon: "error",
        title: "Oops.....",
        text: message,
    });
    dispatch(resetErrAction());
}


export default ErrorMsg;