import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendVerificationRequestParams {
  identifier: string
  url: string
  expires: Date
  provider: {
    server: any
    from: string
  }
  theme: any
}

export async function sendVerificationRequest({
  identifier: email,
  url,
  provider,
}: SendVerificationRequestParams): Promise<void> {
  try {
    // Check if this is a new user (sign up) or existing user (sign in)
    const isNewUser = await checkIfNewUser(email)
    
    const emailContent = isNewUser ? generateSignUpEmail(email, url) : generateSignInEmail(email, url)
    const subject = isNewUser ? 'Welcome to ShareRideStories! Complete your sign-up' : 'Sign in to ShareRideStories'
    
    const { data, error } = await resend.emails.send({
      from: provider.from,
      to: email,
      subject,
      html: emailContent,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error(`Failed to send verification email: ${error.message}`)
    }

    console.log('Verification email sent successfully:', data)
  } catch (error) {
    console.error('Error in sendVerificationRequest:', error)
    throw error
  }
}

async function checkIfNewUser(email: string): Promise<boolean> {
  try {
    // Check in NextAuth's users collection (MongoDB adapter format)
    const { MongoClient } = await import('mongodb')
    const client = new MongoClient(process.env.MONGODB_URI!, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    })
    
    await client.connect()
    const db = client.db()
    const usersCollection = db.collection('users')
    
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() })
    
    await client.close()
    
    return !existingUser
  } catch (error) {
    console.error('Error checking if user exists:', error)
    // If we can't determine, assume new user to be safe
    return true
  }
}

function generateSignUpEmail(email: string, url: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%);">
      <div style="background-color: white; padding: 40px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <img src="https://www.shareridestories.com/logo.png" alt="ShareRideStories Logo" style="width: 48px; height: 48px; border-radius: 12px; object-fit: contain;" />
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #1f2937, #6b7280); background-clip: text; -webkit-background-clip: text; color: transparent;">
              ShareRideStories
            </h1>
          </div>
          <h2 style="color: #1f2937; font-size: 24px; margin: 0;">🎉 Welcome to the Community!</h2>
          <p style="color: #6b7280; font-size: 16px; margin: 10px 0 0 0;">Complete your account setup to start sharing</p>
        </div>
        
        <div style="margin: 30px 0;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Welcome to ShareRideStories! We're excited to have you join our community working together to make ride-hailing safer for everyone.
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Click the button below to complete your account setup and start sharing your experiences. This link will expire in 24 hours.
          </p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            Complete Sign Up
          </a>
        </div>
        
        <div style="margin: 30px 0; padding: 24px; background: linear-gradient(135deg, #dbeafe, #e0e7ff); border-radius: 12px;">
          <h3 style="color: #1e40af; font-size: 18px; margin: 0 0 12px 0;">What you can do with ShareRideStories:</h3>
          <ul style="color: #1e40af; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>🔍 Search for driver experiences by license plate</li>
            <li>📝 Share your own ride experiences to help others</li>
            <li>👍 Upvote helpful stories from the community</li>
            <li>🛡️ Help build a safer ride-hailing environment</li>
            <li>🌍 Contribute to community-driven ride safety</li>
          </ul>
        </div>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px;">
          <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
            <strong>🔐 Security tip:</strong> This email was sent to ${email}. If you didn't sign up for ShareRideStories, you can safely ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            If you're having trouble clicking the button, copy and paste this URL into your browser:
          </p>
          <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin: 10px 0;">
            ${url}
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
            © 2024 ShareRideStories. Building safer rides together.
          </p>
        </div>
      </div>
    </div>
  `
}

function generateSignInEmail(email: string, url: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%);">
      <div style="background-color: white; padding: 40px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <img src="https://www.shareridestories.com/logo.png" alt="ShareRideStories Logo" style="width: 48px; height: 48px; border-radius: 12px; object-fit: contain;" />
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #1f2937, #6b7280); background-clip: text; -webkit-background-clip: text; color: transparent;">
              ShareRideStories
            </h1>
          </div>
          <h2 style="color: #1f2937; font-size: 24px; margin: 0;">👋 Welcome back!</h2>
          <p style="color: #6b7280; font-size: 16px; margin: 10px 0 0 0;">Sign in to your ShareRideStories account</p>
        </div>
        
        <div style="margin: 30px 0;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Click the button below to sign in to your ShareRideStories account and continue contributing to our safety community. This link will expire in 24 hours.
          </p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            Sign In to ShareRideStories
          </a>
        </div>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px;">
          <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
            <strong>🔐 Security tip:</strong> This email was sent to ${email}. If you didn't request this sign-in link, you can safely ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            If you're having trouble clicking the button, copy and paste this URL into your browser:
          </p>
          <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin: 10px 0;">
            ${url}
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
            © 2024 ShareRideStories. Building safer rides together.
          </p>
        </div>
      </div>
    </div>
  `
}

export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Welcome to ShareRideStories!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%);">
          <div style="background-color: white; padding: 40px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <img src="https://www.shareridestories.com/logo.png" alt="ShareRideStories Logo" style="width: 48px; height: 48px; border-radius: 12px; object-fit: contain;" />
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #1f2937, #6b7280); background-clip: text; -webkit-background-clip: text; color: transparent;">
                  ShareRideStories
                </h1>
              </div>
              <h2 style="color: #1f2937; font-size: 24px; margin: 0;">🎉 Welcome to ShareRideStories!</h2>
              <p style="color: #6b7280; font-size: 16px; margin: 10px 0 0 0;">
                ${name ? `Hi ${name},` : 'Hello!'} Thanks for joining our safety community!
              </p>
            </div>
            
            <div style="margin: 30px 0;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                We're excited to have you on board! You can now start exploring all the features ShareRideStories has to offer and help make ride-hailing safer for everyone.
              </p>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #1f2937; font-size: 18px;">Getting Started:</h3>
                <ul style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                  <li>🔍 Search for driver experiences by license plate</li>
                  <li>📝 Share your first ride story</li>
                  <li>👍 Upvote helpful community stories</li>
                  <li>🛡️ Help build a safer ride-hailing environment</li>
                </ul>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.NEXTAUTH_URL}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                Get Started
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                Need help? Reply to this email and we'll be happy to assist you.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
                © 2024 ShareRideStories. Building safer rides together.
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending welcome email:', error)
      throw new Error(`Failed to send welcome email: ${error.message}`)
    }

    console.log('Welcome email sent successfully:', data)
    return data
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error)
    throw error
  }
}

// Keep the old function for backward compatibility
export async function sendVerificationEmail(email: string, url: string) {
  return sendVerificationRequest({
    identifier: email,
    url,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    provider: {
      server: null,
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev'
    },
    theme: null
  })
}
