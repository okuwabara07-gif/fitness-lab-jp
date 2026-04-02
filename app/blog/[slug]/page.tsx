import { getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return (
    <main>
      <header className="site-header">
        <div className="site-title">{post.title}</div>
      </header>
      <main style={{maxWidth:'900px',margin:'0 auto',padding:'2rem 1.5rem 4rem'}}>
        <div className="section-label">{post.genre}</div>
        <h1 style={{fontFamily:'serif',fontWeight:300,fontSize:'1.4rem',margin:'1rem 0 0.5rem'}}>{post.title}</h1>
        <p style={{fontSize:'0.7rem',color:'#888',marginBottom:'2rem'}}>{post.date}</p>
        
        <div style={{marginBottom:'2rem',padding:'1rem',background:'linear-gradient(135deg,#f0fff0,#e6f7ff)',borderRadius:'16px',border:'1.5px solid #b2dfdb'}}>
          <p style={{fontSize:'0.7rem',color:'#00796b',fontWeight:700,marginBottom:'0.75rem',letterSpacing:'0.05em'}}>この記事を読む前に試してほしい</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.75rem'}}>
            <a href="https://shakelink.net/link.php?i=phwux2kr6pyj&m=mhwuxumw5ned" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #b2dfdb'}}>
              <span style={{fontSize:'1.2rem'}}>🧘</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>ホットヨガを無料体験する</div><div style={{fontSize:'0.65rem',color:'#00796b'}}>LAVA → 今すぐ予約</div></div>
            </a>
            <a href="https://port-fitness.jp/" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #b3e5fc'}}>
              <span style={{fontSize:'1.2rem'}}>💪</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>女性専用ジムを試す</div><div style={{fontSize:'0.65rem',color:'#0288d1'}}>PORT → 無料体験へ</div></div>
            </a>
          </div>
        </div>
        <div style={{fontSize:'0.9rem',lineHeight:1.9}}>
          <MDXRemote source={post.content} />
        </div>
        
        <div style={{marginTop:'3rem',borderTop:'2px solid #b2dfdb',paddingTop:'2rem'}}>
          <p style={{fontSize:'0.75rem',color:'#00796b',marginBottom:'1rem',fontWeight:700}}>今すぐ始めてほしいおすすめサービス</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'1rem'}}>
            <a href="https://shakelink.net/link.php?i=phwux2kr6pyj&m=mhwuxumw5ned" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #b2dfdb',borderRadius:'12px',textDecoration:'none',background:'#f0fff0'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🧘</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>ホットヨガLAVA</div>
              <div style={{fontSize:'0.7rem',color:'#00796b',fontWeight:600}}>→ 無料体験を予約する</div>
            </a>
            <a href="https://port-fitness.jp/" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #b3e5fc',borderRadius:'12px',textDecoration:'none',background:'#f0faff'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>💪</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>PORT女性専用</div>
              <div style={{fontSize:'0.7rem',color:'#0288d1',fontWeight:600}}>→ 今すぐ無料体験</div>
            </a>
            <a href="https://ultora.co.jp" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #c8e6c9',borderRadius:'12px',textDecoration:'none',background:'#f1f8e9'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🥤</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>ULTORAプロテイン</div>
              <div style={{fontSize:'0.7rem',color:'#388e3c',fontWeight:600}}>→ 公式で購入する</div>
            </a>
            <a href="https://colorpass-web.vercel.app/fortune" target="_blank" rel="noopener noreferrer" style={{display:'block',padding:'1rem',border:'1px solid #e8d4ff',borderRadius:'12px',textDecoration:'none',background:'linear-gradient(135deg,#f5eeff,#ede0ff)'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🔮</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#7c3aed',marginBottom:'0.25rem'}}>ラッキーボディケアを占う</div>
              <div style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:600}}>→ 今日の運勢を見る</div>
            </a>
          </div>
        </div>
      </main>
    </main>
  )
}
