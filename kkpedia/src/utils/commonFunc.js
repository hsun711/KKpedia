import Swal from "sweetalert2";

export const uploadImage = (e, setFunc, setIcon) => {
	if (e.target.files[0] === null) {
		return;
	} else {
		const fileType = e.target.files[0].type.slice(0, 5);
		if (fileType !== "image") {
			Swal.fire("請上傳圖片檔");
			return;
		} else {
			setFunc(e.target.files[0]);
			setIcon(true);
		}
	}
};
