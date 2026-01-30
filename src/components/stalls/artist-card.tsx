import Image from "next/image"

interface ArtistCardProps {
    name: string
    role: string
    image: string
}

export function ArtistCard({ name, role, image }: ArtistCardProps) {
    return (
        <div className="rounded-xl p-3 shadow-sm border flex flex-col bg-[var(--artist-card-bg)] border-[var(--artist-card-border)]">
            <div className="relative aspect-3/4 w-full mb-3 rounded-lg overflow-hidden">
                <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>
            <div>
                <h4 className="font-medium leading-tight font-albert text-[var(--artist-name-color)]">
                    {name}
                </h4>
                <p className="text-sm font-poppins text-[var(--artist-role-color)]">
                    {role}
                </p>
            </div>
        </div>
    )
}
