import Swal from "sweetalert2";
import { updateSnsURL } from "../utils/firebaseFunc";

export const uploadImage = (e, setFunc, setIcon) => {
	if (e.target.files[0] === null) {
		return;
	} else {
		const fileType = e.target.files[0].type.includes("image");
		if (!fileType) {
			Swal.fire("請上傳圖片檔");
			return;
		} else {
			setFunc(e.target.files[0]);
			setIcon(true);
		}
	}
};

export const checkImages = (e, setFunc) => {
	for (let i = 0; i < e.target.files.length; i++) {
		const newFile = e.target.files[i];
		const fileType = newFile.type.includes("image");

		if (!fileType) {
			Swal.fire("請上傳圖片檔");
			return;
		} else {
			setFunc((prevState) => [...prevState, newFile]);
		}
	}
};

export const checkSnsURL = (text, title, snsRegex, sns) => {
	if (text === undefined) {
		return;
	}
	if (text.match(snsRegex) === null) {
		Swal.fire(`請輸入正確的${sns}網址`);
		return;
	}
	if (!text) {
		text = "";
	} else {
		updateSnsURL(title, sns, text);
	}
};
