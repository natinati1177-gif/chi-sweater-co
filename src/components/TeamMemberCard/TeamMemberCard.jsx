export default function TeamMemberCard({ name, title, bio, image }) {
  return (
    <div className="group">
      <div className="overflow-hidden aspect-[3/4] border-2 border-black mb-4 bg-surface-container-high">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image}
          alt={name}
        />
      </div>
      <h3 className="font-headline-md text-xl uppercase mb-1">{name}</h3>
      <p className="font-label-bold text-secondary uppercase mb-3">{title}</p>
      <p className="font-body-md opacity-70">{bio}</p>
    </div>
  )
}
