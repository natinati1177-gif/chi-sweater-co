import TeamMemberCard from '../TeamMemberCard/TeamMemberCard'

const team = [
  {
    id: 1,
    name: 'Marcus Webb',
    title: 'Founder & Creative Director',
    bio: 'Lifelong NBA fan and former art director. Marcus launched NATI NBA SHOP after years of searching for fan gear that actually matched the energy of the game. Every drop is his answer to that search.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBO1jbJn9ApbCMYi-8-qYdaGOo20lYEr5qeX0iRLSW_lfz3GvNc5Qhj6YpWbTkweM_oxS7jY_RNBRxew5TmVX8BUmDJHZJeWJL77YW-80M3dGsd0Qp3JJ81kQ81mioKc1bZYlmJP8vfxaQIcGSh05XNcHpvMerRBZgyMa9QMJ0ltvq6GCzRavuj8IHOwgppK7kqaUlQwqCWrboH6fmdTIOXa4xargzkcOvmXi40glEpqbSb5xCX1vvukRwChVMEC8h7gtmOFywa9TL',
  },
  {
    id: 2,
    name: 'Aaliyah Torres',
    title: 'Head of Design',
    bio: 'Design graduate with a background in sportswear. Aaliyah translates the visual language of basketball — the jerseys, the courts, the icons — into wearable streetwear that feels both premium and authentic.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfdMpY9zka-lIGXVk90ioEYO0_SkqHxl1EY8v0jiFtHKb3fWW9rgTldSG0ePvaEF2u0TKTNUUrwE0jPLef8t6_c2E9xVWVVRmZMdB-6KfYxw3VYCfsj-pjHghLAYYz9LlILHrY3PkYZu138kfodyW8MU7itxLewMLnqV4B9JFDBZv_sr41pKyA0QGMeRgP3iXYPDnHH1Dg4G1Vx_o6FNiIhG_7r-avbscnbsmyvl-A0pVlPCFpz76h1OuqWL_xfI5KC64HU3Lty3_N',
  },
  {
    id: 3,
    name: 'Jordan Kim',
    title: 'Operations & Brand Strategy',
    bio: 'Former logistics lead turned brand strategist. Jordan built the systems that keep every drop sharp — limited quantities, fast shipping, and a community that knows when to show up.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYjpZBE33h0EX9X958poJ8nqY-ccxLcZqr5CHppHC6xpTvszmZf0vxULa0HHsj41K_m2cQMTjv02daQZ_x9omEV5k11wkRnlOF5LrImksvXH7HOBoCHEGtPi_DN6faT9vu11c0T6tibNeil8OXDHtgcJ9AnSo8DkwCVA5_YW-Gr4635suaYgyTRwphTQKmBa0oA0pDYFwKX6vazmCmvJRrfRVzhDe7v_9EVXsvraVVLrD65uviQ9mU0dqiRqT2Njb9042jeBgMBVbO',
  },
]

export default function TeamSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-headline-lg text-headline-lg uppercase">
          The People<br />Behind the Brand.
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
