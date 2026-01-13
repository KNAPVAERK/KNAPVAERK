import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'KNAPVÆRK - Håndlavede knapper'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { locale: string } }) {
  const isEnglish = params.locale === 'en'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7f6f4',
          position: 'relative',
        }}
      >
        {/* Subtle border frame */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
          }}
        />

        {/* Logo text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontFamily: 'serif',
              fontWeight: 400,
              letterSpacing: '0.15em',
              color: '#1a1a1a',
              margin: 0,
            }}
          >
            KNAPVÆRK
          </h1>

          {/* Decorative line */}
          <div
            style={{
              width: 80,
              height: 1,
              backgroundColor: '#c4a14a',
              display: 'flex',
            }}
          />

          <p
            style={{
              fontSize: 24,
              fontFamily: 'serif',
              fontWeight: 300,
              letterSpacing: '0.2em',
              color: '#666',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            {isEnglish ? 'Handcrafted Buttons' : 'Håndlavede Knapper'}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
