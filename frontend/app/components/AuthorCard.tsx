export default function AuthorCard({ imageUrl, name, role, className }: { imageUrl: string | undefined, name: string | undefined, role?: string, className?: string }) {
    if (!name) {
        return null;
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {imageUrl ?
                <img
                    src={imageUrl || '/default-avatar.png'}
                    alt={name}
                    className="w-10 h-10 rounded-full"
                /> :
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-lg font-medium">{name[0]}</span>
                </div>
            }
            <div>
                <h3 className="text-sm font-medium text-gray-900">
                    {name}
                </h3>
                {role && <p className="text-sm text-gray-500">{role}</p>}
            </div>
        </div>
    )
}
