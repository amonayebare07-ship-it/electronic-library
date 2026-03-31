import { Link } from "react-router-dom";
import { BookOpen, Users, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-library.jpg";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Digital Catalog",
      description: "Browse and search through our entire collection of books with real-time availability tracking.",
      to: "/catalog",
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Easy sign-up process with personalized dashboards for tracking issued books and due dates.",
      to: "/signup",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find any book instantly by title, author, or category with our powerful search functionality.",
      to: "/catalog",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Role-based authentication system ensuring secure access for both members and administrators.",
      to: "/login",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Library" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative py-24 md:py-36">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
              Electronic Library Management System
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Transforming traditional libraries into modern digital experiences. Browse, borrow, and manage books with ease.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                  Browse Catalog
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Become a Member
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground">Why Choose Our E-Library?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A comprehensive system designed to make library management effortless for both administrators and members.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Link
              key={f.title}
              to={f.to}
              className="group relative block"
            >
              <div
                className="h-full rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:border-secondary hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                <div className="mt-4 flex items-center text-xs font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { value: "5,000+", label: "Books" },
              { value: "1,200+", label: "Members" },
              { value: "500+", label: "Authors" },
              { value: "50+", label: "Categories" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-secondary">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground">Ready to Get Started?</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Join our growing community of readers and researchers. Sign up today to access our complete catalog.
        </p>
        <div className="mt-8">
          <Link to="/signup">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
