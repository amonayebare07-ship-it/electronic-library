import { BookOpen, GraduationCap } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container py-16 max-w-3xl">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-12 w-12 text-secondary mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground">About the E-Library</h1>
      </div>

      <div className="prose prose-lg mx-auto space-y-6 text-muted-foreground">
        <p>
          The <strong className="text-foreground">Electronic Library Management System</strong> is designed to transform 
          traditional libraries into modern, digital-first experiences. Developed as a project by <strong className="text-foreground">Akibua Mathias</strong> at 
          Kinkizi Stewards College under the guidance of Mr. Ruhangarinda Brian.
        </p>
        <p>
          This system eliminates manual book tracking, reduces paperwork, and provides real-time 
          availability information to both librarians and members. With features like smart search, 
          member management, and book issuing/returning workflows, the E-Library makes library 
          operations smooth and efficient.
        </p>

        <div className="rounded-lg border bg-card p-6 not-prose">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="h-5 w-5 text-secondary" />
            <h3 className="font-display font-semibold text-foreground">Academic Project</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Submitted in partial fulfilment for the award of a Diploma in Information Management Systems, 
            Department of Science and Technology, Kinkizi Stewards College, 2024-2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
