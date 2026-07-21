const client = require("../openAI");

module.exports = async function chat(message) {
  const request = {
    model: process.env.MODEL,

    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  };

  const response = await client.chat.completions.create(request);

  const content = response.choices[0].message.content;

  console.log(content);

  return content;
};
