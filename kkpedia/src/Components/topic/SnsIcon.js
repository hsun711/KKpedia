import Swal from "sweetalert2";
import fb from "../../img/facebook.png";
import ig from "../../img/instagram.png";
import twitter from "../../img/twitter.png";
import youtube from "../../img/youtube.png";
import add from "../../img/add.png";
import { checkSnsURL } from "../../utils/commonFunc";
import { SnsLink, SnsImg, Edit, EditIcon, IconDiv } from "../../style/idolPage";

function SnsIcon({ item, title }) {
  const AddSns = async (sns) => {
    let { value: text } = await Swal.fire({
      title: `請輸入${sns}網址`,
      input: "text",
      inputPlaceholder: "",
    });
    switch (sns) {
      case "facebook": {
        const snsRegex = /^https:\/\/www\.facebook\.com/;
        checkSnsURL(text, title, snsRegex, "facebook");
        break;
      }
      case "instagram": {
        const snsRegex = /^https:\/\/www\.instagram\.com\//;
        checkSnsURL(text, title, snsRegex, "instagram");
        break;
      }
      case "twitter": {
        const snsRegex = /^https:\/\/twitter\.com\//;
        checkSnsURL(text, title, snsRegex, "twitter");
        break;
      }
      case "youtube": {
        const snsRegex = /^https:\/\/www\.youtube\.com\//;
        checkSnsURL(text, title, snsRegex, "youtube");
        break;
      }
      default:
        break;
    }
  };

  return (
    <Edit key={item.title}>
      {item.facebook === "" ? (
        <IconDiv>
          <EditIcon
            src={add}
            onClick={() => {
              AddSns("facebook");
            }}
          />
        </IconDiv>
      ) : (
        <SnsLink href={item.facebook} target="_blank">
          <SnsImg src={fb} />
        </SnsLink>
      )}
      {item.instagram === "" ? (
        <IconDiv>
          <EditIcon
            src={add}
            onClick={() => {
              AddSns("instagram");
            }}
          />
        </IconDiv>
      ) : (
        <SnsLink href={item.instagram} target="_blank">
          <SnsImg src={ig} />
        </SnsLink>
      )}
      {item.twitter === "" ? (
        <IconDiv>
          <EditIcon
            src={add}
            onClick={() => {
              AddSns("twitter");
            }}
          />
        </IconDiv>
      ) : (
        <SnsLink href={item.twitter} target="_blank">
          <SnsImg src={twitter} />
        </SnsLink>
      )}
      {item.youtube === "" ? (
        <IconDiv>
          <EditIcon
            src={add}
            onClick={() => {
              AddSns("youtube");
            }}
          />
        </IconDiv>
      ) : (
        <SnsLink href={item.youtube} target="_blank">
          <SnsImg src={youtube} />
        </SnsLink>
      )}
    </Edit>
  );
}

export default SnsIcon;
