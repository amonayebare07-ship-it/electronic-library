import { BookOpen, GraduationCap, Library, Target, Award, Users, Laptop } from "lucide-react";
import studentLifeImg from "@/assets/student-life.png";
import developerImg from "@/assets/developer-spotlight.png";

const AboutPage = () => {
  return (
    <div className="container py-16 px-4 md:px-8">
      {/* Header Section */}
      <div className="text-center mb-16 animate-fade-in text-foreground">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-secondary/10 p-4 ring-2 ring-secondary/20">
            <BookOpen className="h-12 w-12 text-secondary" />
          </div>
        </div>
        <h1 className="font-display text-4xl font-bold mb-4 tracking-tight">About the Kinkizi Stewards College E-Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          An African-led digital hub dedicated to academic excellence, innovative research, and the future of Information Management.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold uppercase tracking-wider">
            <Library className="h-4 w-4" />
            Our Vision for Africa
          </div>
          <h2 className="text-3xl font-bold text-foreground leading-tight">Empowering Students Through Digital Knowledge</h2>
          <p className="text-lg text-muted-foreground">
            The <strong className="text-foreground">Electronic Library Management System</strong> is a premier project developed specifically for the academic needs of 
            <strong className="text-foreground text-secondary"> Kinkizi Stewards College</strong>. 
          </p>
          <p className="text-lg text-muted-foreground">
            Spearheaded by <strong className="text-foreground">Akibua Mathias</strong> and mentored by Mr. Ruhangarinda Brian, this platform is built with a deep understanding of our local context and the global standards of digital literacy.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
             <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted p-2 px-3 rounded-lg border">
                <Users className="h-4 w-4 text-secondary" />
                Community Focused
             </div>
             <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-muted p-2 px-3 rounded-lg border">
                <Laptop className="h-4 w-4 text-secondary" />
                Modern Technology
             </div>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-secondary/40 via-primary/20 to-secondary/40 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border aspect-video">
            <img src={studentLifeImg} alt="Students at Kinkizi Stewards College" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
               <p className="text-white text-sm font-medium">Students collaborating at Kinkizi Stewards College Library</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: Target,
            title: "IMS Focused",
            desc: "Designed to meet the core requirements of the Diploma in Information Management Systems."
          },
          {
            icon: Award,
            title: "Local Innovation",
            desc: "Award-winning project submitted to the Dept of Science and Technology, 2024-2026."
          },
          {
            icon: Library,
            title: "Future Ready",
            desc: "Building a foundation for digital libraries across African educational institutions."
          }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl border bg-card/60 backdrop-blur-sm hover:border-secondary transition-all group hover:-translate-y-1 shadow-lg shadow-black/5 hover:shadow-secondary/10">
            <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 ring-1 ring-secondary/20 group-hover:ring-secondary group-hover:bg-secondary/20 transition-all">
              <item.icon className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Spotlight Section */}
      <div className="space-y-12 mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">The Development Spotlight</h2>
          <p className="text-muted-foreground italic leading-relaxed">
            "We wanted to build a system that wasn't just functional, but also representative of the talent here at Kinkizi Stewards College. This is for our students, by our students."
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8 items-center bg-muted/30 rounded-3xl overflow-hidden border">
          <div className="md:col-span-2 aspect-square md:aspect-auto h-full">
            <img src={developerImg} alt="Akibua Mathias at work" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-3 p-8 md:p-12 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Leading the Digital Shift</h3>
              <p className="text-secondary font-semibold uppercase tracking-widest text-sm">Akibua Mathias, Project Lead</p>
            </div>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
               <p>
                 As the lead developer, Akibua focused on creating a seamless blend of speed, accessibility, and reliability. 
               </p>
               <p>
                 This project stands as a testament to what is possible when locally-driven solutions are given a platform to excel. We hope it inspires every student at Kinkizi Stewards College to innovate and lead.
               </p>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-4 text-sm font-bold uppercase text-foreground bg-primary/10 w-fit p-3 px-5 rounded-full border border-primary/20">
                <GraduationCap className="h-5 w-5 text-primary" />
                Class of 2024-2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Branding */}
      <div className="text-center py-16 border-t border-border">
        <p className="text-sm font-bold text-secondary uppercase tracking-[0.3em] mb-4">Official E-Library Of</p>
        <h3 className="text-4xl font-bold text-foreground mb-4">KINKIZI STEWARDS COLLEGE</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Empowering the next generation of African information managers and technology leaders.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
