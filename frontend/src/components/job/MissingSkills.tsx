interface MissingSkillsProps {
  skills: string[];
}

export default function MissingSkills({
  skills,
}: MissingSkillsProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Missing Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-gray-400">
          No missing skills 🎉
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">

          {skills.map((skill, index) => (
            <div
              key={index}
              className="
                rounded-xl
                bg-red-500/20
                px-4
                py-2
                text-red-400
                font-medium
              "
            >
              ❌ {skill}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}