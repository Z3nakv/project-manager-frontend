const AttachmentsSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative block w-full aspect-square rounded-lg border border-border bg-surface-hover animate-pulse"
        />
      ))}
    </div>
  );
};

export default AttachmentsSkeleton;