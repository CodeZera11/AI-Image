interface EmptyProps {
    label: string;
}

const Empty = ({ label }: EmptyProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center h-full mt-10">
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}

export default Empty