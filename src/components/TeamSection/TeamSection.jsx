import TeamMemberCard from '../TeamMemberCard/TeamMemberCard'

const team = [
  {
    id: 1,
    name: 'Marcus Webb',
    title: 'Founder & Creative Director',
    bio: 'Grew up on the South Side. Former art director turned garment obsessive. Marcus designs every piece with one rule: if it doesn\'t survive a Chicago winter, it doesn\'t ship.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBO1jbJn9ApbCMYi-8-qYdaGOo20lYEr5qeX0iRLSW_lfz3GvNc5Qhj6YpWbTkweM_oxS7jY_RNBRxew5TmVX8BUmDJHZJeWJL77YW-80M3dGsd0Qp3JJ81kQ81mioKc1bZYlmJP8vfxaQIcGSh05XNcHpvMerRBZgyMa9QMJ0ltvq6GCzRavuj8IHOwgppK7kqaUlQwqCWrboH6fmdTIOXa4xargzkcOvmXi40glEpqbSb5xCX1vvukRwChVMEC8h7gtmOFywa9TL',
  },
  {
    id: 2,
    name: 'Aaliyah Torres',
    title: 'Head of Design',
    bio: 'SAIC graduate. Aaliyah translates Chicago\'s architectural grid into garment silhouettes — sharp lines, oversized structure, and a palette borrowed from the city\'s steel and brick.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfdMpY9zka-lIGXVk90ioEYO0_SkqHxl1EY8v0jiFtHKb3fWW9rgTldSG0ePvaEF2u0TKTNUUrwE0jPLef8t6_c2E9xVWVVRmZMdB-6KfYxw3VYCfsj-pjHghLAYYz9LlILHrY3PkYZu138kfodyW8MU7itxLewMLnqV4B9JFDBZv_sr41pKyA0QGMeRgP3iXYPDnHH1Dg4G1Vx_o6FNiIhG_7r-avbscnbsmyvl-A0pVlPCFpz76h1OuqWL_xfI5KC64HU3Lty3_N',
  },
  {
    id: 3,
    name: 'Jordan Kim',
    title: 'Operations & Brand Strategy',
    bio: 'Former logistics lead at a Chicago-based manufacturer. Jordan built the supply chain that keeps drops limited without feeling scarce — 100 units, no exceptions, no apologies.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYjpZBE33h0EX9X958poJ8nqY-ccxLcZqr5CHppHC6xpTvszmZf0vxULa0HHsj41K_m2cQMTjv02daQZ_x9omEV5k11wkRnlOF5LrImksvXH7HOBoCHEGtPi_DN6faT9vu11c0T6tibNeil8OXDHtgcJ9AnSo8DkwCVA5_YW-Gr4635suaYgyTRwphTQKmBa0oA0pDYFwKX6vazmCmvJRrfRVzhDe7v_9EVXsvraVVLrD65uviQ9mU0dqiRqT2Njb9042jeBgMBVbO',
  },
]

export default function TeamSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-headline-lg text-headline-lg uppercase">
          The People<br />Behind the Stitch.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {team.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </div>
    </section>
  )
}
