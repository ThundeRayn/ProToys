import { useEffect, useRef, useState } from 'react'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'
import { useLanguage } from '../i18n/LanguageContext'
import { aboutPageText } from '../i18n/translations/aboutPage'

const icons = [
  <EmojiEventsOutlinedIcon sx={{ fontSize: 20, color: '#c0bdb8' }} />,
  <ApartmentOutlinedIcon   sx={{ fontSize: 20, color: '#c0bdb8' }} />,
  <GroupsOutlinedIcon      sx={{ fontSize: 20, color: '#c0bdb8' }} />,
  <PublicOutlinedIcon      sx={{ fontSize: 20, color: '#c0bdb8' }} />,
  <HandymanOutlinedIcon    sx={{ fontSize: 20, color: '#c0bdb8' }} />,
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return <>{count}{suffix}</>
}

export default function AboutStatsBar() {
  const { lang } = useLanguage()
  const stats = aboutPageText[lang].stats
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const cell = (i: number, content: React.ReactNode) => {
    const isLast = i === stats.length - 1
    return (
      <div
        key={i}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '36px 16px',
          borderRight: isLast ? 'none' : '1px solid #ececec',
        }}
      >
        {content}
      </div>
    )
  }

  return (
    <section style={{ background: '#fff' }} ref={ref}>
      <div className="px-4 md:px-12" style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Desktop: 6-column row */}
        <div
          className="hidden md:flex"
          style={{ borderTop: '1px solid #ececec', borderBottom: '1px solid #ececec' }}
        >
          {stats.map((stat, i) => cell(i, (
            <>
              <div style={{ marginBottom: 10 }}>{icons[i]}</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: '#c7ab54', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.01em' }}>
                {stat.num !== undefined
                  ? <CountUp target={stat.num} suffix={stat.suffix ?? ''} active={active} />
                  : stat.display}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1714', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </>
          )))}
        </div>

        {/* Mobile: 3-column grid */}
        <div
          className="grid md:hidden"
          style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', borderTop: '1px solid #ececec' }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px 10px',
                borderRight: i % 3 !== 2 ? '1px solid #ececec' : 'none',
                borderBottom: i < 3 ? '1px solid #ececec' : 'none',
              }}
            >
              <div style={{ marginBottom: 8 }}>{icons[i]}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#c7ab54', lineHeight: 1, marginBottom: 4, letterSpacing: '-0.01em' }}>
                {stat.num !== undefined
                  ? <CountUp target={stat.num} suffix={stat.suffix ?? ''} active={active} />
                  : stat.display}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1714', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
