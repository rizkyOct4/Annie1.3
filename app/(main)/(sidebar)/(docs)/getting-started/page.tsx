import { BsInstagram, BsGithub } from "react-icons/bs";

const Get = async () => {
  "use cache";

  return (
    <div className="w-full text-gray-200">
      <div className="w-full mx-auto px-6 py-10">
        {/* ================= TITLE ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Curriculum Vitae
          </h1>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex gap-6 items-start">
          {/* ================================================= */}
          {/* ================= LEFT : MAIN CV ================= */}
          {/* ================================================= */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-10">
            {/* ================= HEADER ================= */}
            <section className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-wide">
                RIZKY OCTA ARINDA
              </h2>
              <span className="text-sm text-emerald-400">
                Web Developer • Multimedia
              </span>
            </section>

            <hr className="border-white/10" />

            {/* ================= PROFILE ================= */}
            <section className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Profile</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                A graduate of Sultan Syarif Kasim University in Riau with strong
                multimedia skills. Experienced in managing projects, organizing
                schedules, and supporting office operations effectively.
              </p>
            </section>

            <hr className="border-white/10" />

            {/* ================= EXPERIENCE ================= */}
            <section className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Experience</h3>

              <div className="flex flex-col gap-4 text-sm text-gray-300">
                <div>
                  <b>Qonqar Store</b> — 5 Months
                  <ul className="list-disc ml-5 mt-1">
                    <li>Designing various office operational requirements</li>
                  </ul>
                </div>

                <div>
                  <b>Era Mulya</b> — 1 Month
                  <ul className="list-disc ml-5 mt-1">
                    <li>Designing various office operational requirements</li>
                  </ul>
                </div>

                <div>
                  <b>Mayor's Office Pekanbaru</b> — 6 Months
                  <ul className="list-disc ml-5 mt-1">
                    <li>Designing content requirements</li>
                    <li>Participate in various ongoing activities</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-white/10" />

            {/* ================= EDUCATION ================= */}
            <section className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Education</h3>
              <span className="text-sm font-medium">UIN SUSKA RIAU — 2024</span>
              <span className="text-sm text-gray-300">
                Bachelor of Communication Science
              </span>
            </section>

            <hr className="border-white/10" />

            {/* ================= SKILLS ================= */}
            <section className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex gap-3 flex-wrap text-sm">
                {["Graphic Design", "Web Development"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full border border-white/10 hover:bg-white/10 transition">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* ================================================= */}
          {/* ================= RIGHT : INFO ================= */}
          {/* ================================================= */}
          <div className="w-[320px] flex flex-col gap-5">
            {/* CONTACT */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
              <h4 className="font-semibold text-sm">Contact</h4>
              <div className="text-sm text-gray-300 flex flex-col gap-1">
                <span>📞 0895618199827</span>
                <span>📞 081371713876</span>
                <span>✉️ rizkysf94@gmail.com</span>
                <span>📍 Indonesia, Pekanbaru</span>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3">
              <h4 className="font-semibold text-sm">Social Media</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/rizkyo_cta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-white/10 hover:bg-white/10 transition">
                  <BsInstagram size={20} />
                </a>

                <a
                  href="https://github.com/rizkyOct4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-white/10 hover:bg-white/10 transition">
                  <BsGithub size={20} />
                </a>
              </div>
            </div>

            {/* HIGHLIGHT */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-xs text-gray-400 leading-relaxed">
              Passionate about combining creativity and technology to build
              meaningful digital experiences for modern users.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Get;
