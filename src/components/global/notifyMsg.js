import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrAction } from "../../redux/slices/globalAction/globalActions";

const NotifyMsg = ({title, message}) => {
  const dispatch = useDispatch();
    Swal.fire({
        title: title,
        text: message,
        icon: "info"
      });
    dispatch(resetErrAction())
};

export default NotifyMsg;