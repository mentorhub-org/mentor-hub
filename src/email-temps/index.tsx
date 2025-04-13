// import fs from 'fs'
// import path from 'path'

// export const getTemplates = (
//   userName: string,
//   link: string,
//   fileName: string,
// ) => {
//   const template = fs.readFileSync(path.resolve(__dirname, fileName))
//   return template
//     .toString()
//     .replace('{{ username }}', userName)
//     .replace('{{ link }}', link)
// }

export const emailTemplates = {
  emailVerification: ({ to, code }: { to: string; code: string }) => ({
    to,
    subject: 'Verify your email',
    html: `<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome, to Frontline</h1>
    <p>Verify your email by entering the code below:</p>
    <h2>${code}</h2>
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
