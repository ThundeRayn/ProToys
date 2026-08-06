import { useLanguage } from '../i18n/LanguageContext'

const content = {
  en: {
    label: 'Company Overview',
    paras: [
      'Henan Pro Toys Co., Ltd. was founded in 2022 and is located in Yongcheng City, Henan Province, China. We specialize in the design, development, and manufacturing of plush toys, blind box collectibles, trendy toys, plush keychains, bag charms, and customized character products.',
      'With two modern production facilities covering over 10,500 square meters and a team of 300+ employees, we produce more than 4 million pieces annually. Combining strong product design and development capabilities with efficient manufacturing processes, we provide complete solutions from concept creation and sample development to mass production.',
      'Pro Toys supports OEM and ODM projects, offering services including product design, material selection, embroidery, packaging, and customization to meet diverse market needs. With strict quality control systems and certifications including Walmart audits, SEDEX, and ISO 9001, we deliver innovative, safe, and reliable products to customers worldwide.',
      'Our products are exported to markets including the United States, Canada, Europe, and Australia. We are committed to creating innovative toy products and building long-term partnerships with global brands, retailers, and entertainment companies.',
    ],
  },
  cn: {
    label: '公司简介',
    paras: [
      '河南普罗玩具有限公司成立于2022年，位于中国河南省永城市，专注于毛绒玩具、盲盒潮玩、潮流玩具、毛绒钥匙扣、包挂及定制卡通形象产品的设计、研发与生产。',
      '公司拥有两座现代化生产基地，总面积超过10,500平方米，员工300余人，年产量超过400万件。凭借强大的产品设计研发能力与高效的生产制造流程，公司提供从创意设计、样品开发到批量生产的一站式解决方案。',
      '普罗玩具支持 OEM 和 ODM 项目，提供产品设计、材料选择、刺绣、包装及定制等服务，满足多样化的市场需求。公司拥有严格的质量管理体系，并通过 Walmart 审核、SEDEX 及 ISO 9001 等认证，为全球客户提供创新、安全、可靠的产品。',
      '公司产品已出口至美国、加拿大、欧洲及澳大利亚等市场。我们致力于打造创新玩具产品，与全球品牌、零售商及娱乐公司建立长期合作伙伴关系。',
    ],
  },
}

export default function AboutIntroSection() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <div style={{ background: '#f8f8f6', borderTop: '1px solid #f0f0f0', padding: '72px 48px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <img src="/Logo_nobackground.png" alt="Pro Toys" style={{ height: 120, width: 'auto', display: 'block', margin: '0 auto 28px' }} />
        {t.paras.map((p, i) => (
          <p key={i} style={{ fontSize: 15, color: '#444', lineHeight: 1.85, textAlign: 'left', margin: i < t.paras.length - 1 ? '0 0 16px' : '0 0 24px' }}>
            {p}
          </p>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 2, background: '#c7ab54', flexShrink: 0 }} />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#c7ab54', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {t.label}
          </span>
          <div style={{ width: 28, height: 2, background: '#c7ab54', flexShrink: 0 }} />
        </div>
      </div>
    </div>
  )
}
