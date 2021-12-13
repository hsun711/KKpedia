import Swal from "sweetalert2";
import fb from "../../img/facebook.png";
import ig from "../../img/instagram.png";
import twitter from "../../img/twitter.png";
import youtube from "../../img/youtube.png";
import add from "../../img/add.png";
import { checkSnsURL } from "../../utils/commonFunc";
import { SnsLink, SnsImg, Edit, EditIcon } from "../../style/idolPage";

function SnsIcon({ item, title }) {
  const AddSns = async (sns) => {
    let { value: text } = await Swal.fire({
      title: `請輸入${sns}網址`,
      input: "text",
      inputPlaceholder: "",
    });
    if (sns === "facebook") {
      const snsRegex = /^https:\/\/www\.facebook\.com/;
      checkSnsURL(text, title, snsRegex, "facebook");
    } else if (sns === "instagram") {
      const snsRegex = /^https:\/\/www\.instagram\.com\//;
      checkSnsURL(text, title, snsRegex, "instagram");
    } else if (sns === "twitter") {
      const snsRegex = /^https:\/\/twitter\.com\//;
      checkSnsURL(text, title, snsRegex, "twitter");
    } else if (sns === "youtube") {
      const snsRegex = /^https:\/\/www\.youtube\.com\//;
      checkSnsURL(text, title, snsRegex, "youtube");
    }
  };
  return (
    <Edit key={item.title}>
      {item.facebook === "" ? (
        <EditIcon
          src={add}
          onClick={() => {
            AddSns("facebook");
          }}
        />
      ) : (
        <SnsLink href={item.facebook} target="_blank">
          <SnsImg src={fb} />
        </SnsLink>
      )}
      {item.instagram === "" ? (
        <EditIcon
          src={add}
          onClick={() => {
            AddSns("instagram");
          }}
        />
      ) : (
        <SnsLink href={item.instagram} target="_blank">
          <SnsImg src={ig} />
        </SnsLink>
      )}
      {item.twitter === "" ? (
        <EditIcon
          src={add}
          onClick={() => {
            AddSns("twitter");
          }}
        />
      ) : (
        <SnsLink href={item.twitter} target="_blank">
          <SnsImg src={twitter} />
        </SnsLink>
      )}
      {item.youtube === "" ? (
        <EditIcon
          src={add}
          onClick={() => {
            AddSns("youtube");
          }}
        />
      ) : (
        <SnsLink href={item.youtube} target="_blank">
          <SnsImg src={youtube} />
        </SnsLink>
      )}
    </Edit>
  );
}

export default SnsIcon;
