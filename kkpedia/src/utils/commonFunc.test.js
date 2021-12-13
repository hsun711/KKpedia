import { checkSnsURL } from "./commonFunc";

describe("checkSnsURL", () => {
  it("URL be the same domain", () => {
    const text = "https://www.youtube.com/c/BANGTANTV";
    const title = "BTS";
    const snsRegex = /^https:\/\/www\.youtube\.com\//;
    const sns = "youtube";
    expect(checkSnsURL(text, title, snsRegex, sns)).toEqual({
      title: "BTS",
      sns: "youtube",
      text: "https://www.youtube.com/c/BANGTANTV",
    });
  });

  it("URL be different domain", () => {
    const text = "https://www.yourator.co/";
    const title = "BTS";
    const snsRegex = /^https:\/\/www\.youtube\.com\//;
    const sns = "youtube";
    expect(checkSnsURL(text, title, snsRegex, sns)).toEqual(false);
  });

  it("URL be undefined domain", () => {
    const text = "";
    const title = "BTS";
    const snsRegex = /^https:\/\/www\.youtube\.com\//;
    const sns = "youtube";
    expect(checkSnsURL(text, title, snsRegex, sns)).toEqual(false);
  });
});
