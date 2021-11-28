import Swal from "sweetalert2";
import { popupSignin, getUserData, setUserData } from "../utils/firebaseFunc";

const socialMediaAuth = (provider) => {
	return popupSignin(provider)
		.then((res) => {
			getUserData(res.user.uid).then((doc) => {
				const data = {
					email: res.user.email,
					userImage: res.user.photoURL,
					userName: res.user.displayName,
					userId: res.user.uid,
					userLevel: 0,
					user_banner: "",
				};
				if (doc.exists) {
					Swal.fire("登入成功");
				} else {
					setUserData(res.user.uid, data);
				}
			});
			return res.user;
		})
		.catch((error) => {
			return error;
		});
};

export default socialMediaAuth;
