function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-500 shadow-lg shadow-blue-500/30">
        <span className="text-lg font-bold text-white">
          R
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          ResumeAI
        </h1>

        <p className="text-xs text-gray-500">
          Career Intelligence
        </p>
      </div>
    </div>
  );
}

export default Logo;