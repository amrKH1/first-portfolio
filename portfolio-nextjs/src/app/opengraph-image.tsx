import { ImageResponse } from 'next/og'

export const alt = 'Amr Khaled - Full Stack Developer & Tech Innovator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}
        >
          Amr Khaled
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#a1a1aa',
            marginBottom: '16px',
            lineHeight: 1.3,
          }}
        >
          Full Stack Developer & Tech Innovator
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#71717a',
            lineHeight: 1.4,
          }}
        >
          React • Next.js • Node.js • TypeScript
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
