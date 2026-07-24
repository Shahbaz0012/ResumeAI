import GoogleLogo from "../assets/logos/google.png";
import MicrosoftLogo from "../assets/logos/microsoft.png";
import AmazonLogo from "../assets/logos/amazon.png";
import MetaLogo from "../assets/logos/meta.png";

const companies = [
  { name: "Google", logo: GoogleLogo },
  { name: "Microsoft", logo: MicrosoftLogo },
  { name: "Amazon", logo: AmazonLogo },
  { name: "Meta", logo: MetaLogo },

  // Duplicate for smooth infinite animation
  { name: "Google-2", logo: GoogleLogo },
  { name: "Microsoft-2", logo: MicrosoftLogo },
  { name: "Amazon-2", logo: AmazonLogo },
  { name: "Meta-2", logo: MetaLogo },
];

const Trusted = () => {
  return (
    <section className="bg-zinc-950 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-400">
          Trusted by job seekers worldwide
        </p>

        <div className="mt-12 overflow-hidden">
          <div className="marquee gap-8">
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex h-28 w-56 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:scale-105 hover:border-blue-500"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;