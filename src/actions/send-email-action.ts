import transporter from "@/lib/nodemailer";

export const sendEmail = async ({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) => {
  const mailOptions = {
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: `${meta.description}\n\nClick here: ${meta.link}`,
    html: `
      <div style="
        font-family: Arial, sans-serif;
        color: #000;
        background-color: #fff;
        line-height: 1.5;
        padding: 20px;
      ">
        <p style="margin-bottom: 20px;">${meta.description}</p>

        <!-- Button -->
        <p style="text-align: center; margin: 30px 0;">
          <a href="${meta.link}" target="_blank" style="
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            color: #000;
            text-decoration: none;
            border: 2px solid #000;
            background-color: #fff;
          ">
            Click Here
          </a>
        </p>

        <p style="font-size: 12px; color: #555; margin-top: 30px;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <a href="${meta.link}" target="_blank" style="color: #000; text-decoration: underline;">
            ${meta.link}
          </a>
        </p>

        <hr style="border: 1px solid #000; margin-top: 20px;">
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};
