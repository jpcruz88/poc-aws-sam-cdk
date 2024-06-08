import { handler } from "./src/index";

const mockEvent = {
  headers: {
    Authorization:
      "Bearer EAAIpMeZCg3YQBO5EKah9Ub7ATWyJ7ghIraahD2pnorZC80LtfqW7c5DmXVdSDgKtKqBJXiPFkMlg5PSeUYF0MWWqj9RC7zuDSDYMSxoHBzxvY8o0qzuDEwraZCfq9iVlZAhqVmGszjgKBjfvNt1GKBNiC6FZBdnNB0Bc403kasTtE9VAZCWLNTA2qtcSYXZBRBHHjMuI3ZAj1F5aZAgmpsUnmhPobmEuEWPhu9n0ZD",
  },
  body: JSON.stringify({
    phone_id: 123457,
    whatsapp_id: 6552474,
    messaging_product: "whatsapp",
    to: "",
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US",
      },
    },
  }),
};

handler(mockEvent)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
