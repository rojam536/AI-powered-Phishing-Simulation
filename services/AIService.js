const OpenAI = require('openai');

class AIService {
  constructor() {
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }) : null;
  }

  async generatePhishingEmail(theme, difficulty) {
    const prompt = `
      You are a cybersecurity training expert. Generate a realistic but ETHICAL phishing email for a corporate simulation.
      Theme: ${theme}
      Difficulty: ${difficulty}
      
      Requirements:
      1. Realistic subject line.
      2. Professional email body.
      3. A clear call-to-action (CTA).
      4. DO NOT include real malicious links or attachments.
      5. The email should look like a standard business communication (e.g., HR, IT, Banking).
      
      Format the response as JSON:
      {
        "subject": "...",
        "body": "...",
        "ctaText": "..."
      }
    `;

    if (!this.openai) {
      console.warn('OpenAI API key missing. Returning mock data for simulation.');
      return this.getMockEmail(theme, difficulty);
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('AI Generation Error:', error);
      return this.getMockEmail(theme, difficulty);
    }
  }

  getMockEmail(theme, difficulty) {
    const mocks = {
      banking: {
        subject: "Urgent: Unusual Activity on Your Account",
        body: "Dear Customer, we detected a login from an unknown device. Please verify your identity immediately.",
        ctaText: "Secure My Account"
      },
      hr: {
        subject: "Action Required: Updated Employee Benefits Policy",
        body: "Hello Team, the benefits policy for the upcoming quarter has been updated. Please review and sign.",
        ctaText: "Review Policy"
      },
      it: {
        subject: "Security Alert: Password Expiration Notice",
        body: "Your system password will expire in 24 hours. Please click below to reset it and maintain access.",
        ctaText: "Reset Password"
      }
    };

    return mocks[theme.toLowerCase()] || mocks.it;
  }
}

module.exports = new AIService();
