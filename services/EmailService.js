const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPhishingEmail(to, subject, body, trackingUrl, ctaText) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <p>${body.replace(/\n/g, '<br>')}</p>
        <div style="margin-top: 20px;">
          <a href="${trackingUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">${ctaText}</a>
        </div>
        <hr style="margin-top: 40px;">
        <p style="font-size: 12px; color: #777;">
          This is an internal cybersecurity simulation. Ref ID: SIM-${Date.now()}
        </p>
      </div>
    `;

    try {
      const info = await this.transporter.sendMail({
        from: `"Security Department" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });

      console.log(`Simulation email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('Email Sending Error:', error);
      return false;
    }
  }
}

module.exports = new EmailService();
