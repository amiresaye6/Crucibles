const axios = require("axios"); // Ensure axios is installed for HTTP requests

// AI API call to generate report
const generateReport = async (problem) => {
  // Define the prompt with placeholder for user input
  const prompt = `You are an AI assistant tasked with analyzing a text description of a problem. From the text, determine the department responsible for solving the problem, the priority level, and assign a numerical priority score from 0 to 100 based on urgency (0 = can wait, 100 = needs immediate solution). Also, provide a confidence score for your analysis. The departments are categorized as follows: 'inf' (infrastructure), 'ele' (electrical), 'wm' (water management), 'hs' (health and safety). Priority levels are 'low', 'medium', or 'high'. Return the result as a JSON object with the following structure: { 'department': string, 'priority': string, 'priorityScore': number, 'confidence': number }. Ensure the output contains only the JSON object and no additional text. Analyze the following problem description: ${problem}`;
  const AI_API_KEY_REPORT = process.env.AI_API_KEY_REPORT;

  try {
    // Make API call to Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${AI_API_KEY_REPORT}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the generated content from the response
    const generatedContent = response.data.candidates[0].content.parts[0].text;

    // Log the raw content for debugging
    console.log("Raw API response content:", generatedContent);

    // Remove Markdown code block formatting and normalize content
    let cleanedContent = generatedContent
      .replace(/^```json\n?/, '') // Remove opening ```json (with optional newline)
      .replace(/\n?```$/, '')     // Remove closing ``` (with optional newline)
      .replace(/\r\n/g, '\n')     // Normalize line endings
      .trim();                    // Remove leading/trailing whitespace

    // Extract the JSON object by matching the first { ... } block
    const jsonMatch = cleanedContent.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON object found in API response");
    }
    cleanedContent = jsonMatch[0];

    // Replace single quotes with double quotes for valid JSON
    cleanedContent = cleanedContent.replace(/'/g, '"');

    // Log the cleaned content for debugging
    console.log("Cleaned content:", cleanedContent);

    // Parse the cleaned content as JSON
    const report = JSON.parse(cleanedContent);

    // Normalize confidence score if it's in percentage (e.g., 95 -> 0.95)
    if (report.confidence > 1) {
      report.confidence = report.confidence / 100;
    }

    // Validate the response structure
    if (
      !report.department ||
      !["inf", "ele", "wm", "hs"].includes(report.department) ||
      !report.priority ||
      !["low", "medium", "high"].includes(report.priority) ||
      typeof report.priorityScore !== "number" ||
      report.priorityScore < 0 ||
      report.priorityScore > 100 ||
      typeof report.confidence !== "number" ||
      report.confidence < 0 ||
      report.confidence > 1
    ) {
      throw new Error("Invalid response format from AI API");
    }

    return report;
  } catch (error) {
    console.error("Error generating report:", error.message);
    console.error("Error details:", error);
    throw new Error("Failed to generate report from AI API");
  }
};

module.exports = { generateReport };
