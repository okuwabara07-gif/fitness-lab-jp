import Link from 'next/link'

const RELATED_SITES = [
  { name: "ピラティスLAB", url: "https://pilates-lab-jp.vercel.app" },
  { name: "ランニングLAB", url: "https://running-lab-jp.vercel.app" },
  { name: "ランニングノート", url: "https://running-note-jp.vercel.app" },
  { name: "ストレッチLAB", url: "https://stretch-lab-jp.vercel.app" },
  { name: "スイムノート", url: "https://swim-note-jp.vercel.app" },
  { name: "ヨガポーズJP", url: "https://yoga-pose-jp.vercel.app" },
  { name: "ゴルフLAB", url: "https://golf-lab-jp.vercel.app" },
  { name: "サウナログ", url: "https://sauna-log-jp.vercel.app" },

]

export default function RelatedSites() {
  return (
    <div style={{
      marginTop: '3rem',
      padding: '1.5rem',
      background: '#f8f9fa',
      borderRadius: '8px',
      borderTop: '2px solid #e9ecef'
    }}>
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#333'
      }}>関連サイト</h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {RELATED_SITES.map((site) => (
          
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.4rem 0.8rem',
              background: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: '#495057',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            {site.name}
          </a>
        ))}
      </div>
    </div>
  )
}
