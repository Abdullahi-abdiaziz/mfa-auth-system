// eslint-disable-next-line react/prop-types
function TextHeader({ title, subtitle, icon: Icon, variant }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {Icon && (
        <div className="px-2 py-[7px] rounded-xl border bg-white">
          <Icon size={30} className={`text-${variant}`} />
        </div>
      )}
      <h1 className="text-lg font-bold text-black">{title}</h1>
      <p className="text-sm text-gray-500 w-3/4 text-center">{subtitle}</p>
    </div>
  );
}

export default TextHeader;
