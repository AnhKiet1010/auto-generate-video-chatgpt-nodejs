require("dotenv").config();

// TODO: Make sure to insert your OpenAI key here:
const openAiApiKey = process.env.CHAT_GPT_API_KEY;

async function run() {
  // Call OpenAI's API
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      // The model currently used by ChatGPT
      model: "gpt-3.5-turbo",
      // The conversation history of this chat. Let's start by saying hi.
      messages: [
        {
          role: "user",
          content: "Hi!",
        },
      ],
    }),
  });

  // Catch any unsuccessful HTTP responses
  if (!response.ok) {
    console.error(
      `Error: OpenAI returned status code ${response.status}. ` +
        `Make sure that you've provided a valid OpenAI API key`
    );
    process.exit(1);
  }

  // Parse ChatGPT's JSON response as a JavaScript object
  const data = await response.json();

  // Print the results to the console
  console.log(JSON.stringify(data));
}

run().catch((error) => console.error(error));
