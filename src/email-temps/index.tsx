export const emailTemplates = {
  emailVerification: ({ to, code }: { to: string; code: string }) => ({
    to,
    subject: 'Verify your email',
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6fa;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding: 40px 15px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 30px;">
            <tr>
              <td align="center" style="font-family: Arial, sans-serif;">
                <h2 style="color: #007bff; margin: 0 0 20px;">Welcome to Mentor Hub 👋</h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                  Thank you for signing up!<br />
                  Please confirm your email to activate your account.
                </p>
                <a href="${code}" style="background: linear-gradient(55.08deg, #137bdd 20.31%, #4db7ff 72.54%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                  Confirm Email
                </a>
                <p style="color: #999999; font-size: 12px; margin-top: 30px;">
                  If you did not create an account, you can safely ignore this email.
                </p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                <p style="color: #aaaaaa; font-size: 12px;">
                  &copy; 2025 Mentor Hub. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  }),
  emailVerified: ({ to }: { to: string }) => ({
    to,
    subject: 'Email verified successfully',
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Email verified successfully</h1>
  </body>
</html>`,
  }),
  register: ({ to, name }: { to: string; name: string }) => ({
    to,
    subject: 'Welcome to Frontline',
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome, to Frontline</h1>
    <p>Hello ${name},</p>
    <p>Thank you for registering with us.</p>
    <p>We are excited to have you on board!</p>
  </body>
</html>`,
  }),
  forgetPassword: ({ to, code }: { to: string; code: string }) => ({
    to,
    subject: 'Forgot password',
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>You have requested a password reset</h1>
     <p>Verify your email by entering the code below:</p>
     <h2>${code}</h2>
  </body>
</html>`,
  }),
  resetPassword: ({
    to,
    name,
    url,
  }: {
    to: string
    name: string
    url: string
  }) => ({
    to,
    subject: 'Password reset',
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Password reset</h1>
    <p>Hello ${name},</p>
    <p>Click <a href="${url}">here</a> to reset your password.</p>
  </body>
</html>`,
  }),
  companyEmailVerification: ({
    to,
    url,
    token,
  }: {
    to: string
    url: string
    token: string
  }) => {
    const urlObj = new URL(url)

    urlObj.searchParams.append('token', token)

    return {
      to,
      subject: 'Verify your email',
      html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome, to Frontline</h1>
    <p>Verify your email by clicking <a href="${urlObj.href}">here</a></p>
  </body>
</html>`,
    }
  },
} as const
