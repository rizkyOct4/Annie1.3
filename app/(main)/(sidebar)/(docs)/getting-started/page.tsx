import Image from "next/image";
import { BsInstagram, BsGithub } from "react-icons/bs";

const Get = async () => {
  "use cache";
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <h1 className="text-4xl font-bold mb-10 tracking-tight">
        Curriculum Vitae
      </h1>

      <div className="bg-black/40 border border-emerald-500 rounded-xl p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-wide">
              RIZKY OCTA
              <br />
              ARINDA
            </h2>
          </div>

          <div className="relative w-28 h-28 overflow-hidden border border-white/20 rounded-md">
            <Image
              priority
              src="/photo/FOTowebp.webp"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 space-y-8">
            <section>
              <h3 className="text-lg font-semibold mb-3 tracking-wide uppercase text-gray-100 flex items-center gap-3">
                Profile
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                A graduate of Sultan Syarif Kasim University in Riau with strong
                multimedia skills. Experienced in managing projects, organizing
                schedules, and supporting office operations effectively.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3 tracking-wide uppercase text-gray-100 flex items-center gap-3">
                Contact
              </h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>📞 0895618199827</li>
                <li>📞 081371713876</li>
                <li>✉️ rizkysf94@gmail.com</li>
                <li>📍 Jl. Bandes, Riau</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3 tracking-wide uppercase text-gray-100 flex items-center gap-3">
                Education
              </h3>
              <p className="font-semibold text-sm">UIN SUSKA RIAU | 2024</p>
              <p className="text-gray-300 text-sm">
                Bachelor of Communication Science
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Ability</h3>
              <ul className="list-disc ml-5 text-sm text-gray-300">
                <li>Graphic Design</li>
                <li>Web Development</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3 tracking-wide uppercase text-gray-100 flex items-center gap-3">
                Social Media
              </h3>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/rizkyo_cta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-white/10 hover:bg-white/10 transition">
                  <BsInstagram size={20} className="text-gray-300" />
                </a>

                <a
                  href="https://github.com/rizkyOct4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-white/10 hover:bg-white/10 transition">
                  <BsGithub size={20} className="text-gray-300" />
                </a>
              </div>
            </section>
          </div>

          <div className="w-px bg-emerald-500"></div>

          <div className="flex-1 space-y-8">
            <section>
              <h3 className="text-lg font-semibold mb-3 tracking-wide uppercase text-gray-100 flex items-center gap-3">
                Experience
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">
                    Qonqar Store | 5 Month
                  </h4>
                  <ul className="list-disc ml-5 text-sm text-gray-300">
                    <li>Designing various office operational requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">Era Mulya | 1 Month</h4>
                  <ul className="list-disc ml-5 text-sm text-gray-300">
                    <li>Designing various office operational requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">
                    Mayor's office Pekanbaru | 6 Month
                  </h4>
                  <ul className="list-disc ml-5 text-sm text-gray-300">
                    <li>Designing content requirements</li>
                    <li>Participate in various ongoing activities</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Get;
