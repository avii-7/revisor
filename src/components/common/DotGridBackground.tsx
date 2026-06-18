export default function DotGridBackground() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
                backgroundImage:
                    "radial-gradient(var(--color-outline-variant) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
            }}
        />
    );
}