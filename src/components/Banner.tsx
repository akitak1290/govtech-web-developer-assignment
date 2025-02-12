// TODO: add Singapore Government logo
export default function Banner() {
  return (
    <span className="bg-[#F0F0F0] w-full flex justify-center">
      <div className="max-w-screen-xl w-full px-4 py-1">
        <p className="text-xs text-[#5B5B5B] flex gap-2">
          <img src="/singapore-lion.svg" alt="singapore-lion-svg" width={16} height={16} />
          An Official Website of the <strong>Singapore Government</strong>
        </p>
      </div>
    </span>
  );
}
