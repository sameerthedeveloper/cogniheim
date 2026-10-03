import { ImageResponse } from 'next/og';

export const alt = 'Cogniheim — Technology & Product Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'linear-gradient(135deg, #f4f1ea 0%, #eab08f 100%)',
          color: '#3d3929',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: '#c2653f' }}>
          TECHNOLOGY &amp; PRODUCT STUDIO
        </div>
        <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -4, marginTop: 24 }}>
          Cogniheim
        </div>
        <div style={{ fontSize: 36, marginTop: 24, color: '#87795e' }}>
          Modern web products, software and SaaS — Chennai, India
        </div>
      </div>
    ),
    size
  );
}
