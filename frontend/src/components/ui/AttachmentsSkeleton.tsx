const AttachmentsSkeleton = () => {
  return (
    <div className="flex gap-2 w-full">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-24 w-24 md:h-14 md:w-14 rounded-lg bg-[#2d3348] animate-pulse"
        />
      ))}
    </div>
  );
};

export default AttachmentsSkeleton;