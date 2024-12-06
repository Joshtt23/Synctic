"use client";

import { RefObject, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Shield, BarChart3 } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <HeroSection />
        <FeaturesSection />
        <SupportedAccountsSection />
        <DevelopersSection />
        <BusinessesSection />
        <DashboardSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="text-center mb-16 py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Unify Your <span className="text-primary">Financial Data</span>
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          Synctic: The universal connector for the entire financial ecosystem
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link href="/auth/signup">
          <Button size="lg" className="text-lg">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<Code className="w-12 h-12 mb-4 text-blue-400" />}
          title="Single API Integration"
          description="Replace multiple service integrations with one standardized API"
        />
        <FeatureCard
          icon={<Zap className="w-12 h-12 mb-4 text-yellow-400" />}
          title="Real-time Synchronization"
          description="Get instant updates with real-time data sync and webhooks"
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 mb-4 text-green-400" />}
          title="Secure Architecture"
          description="Multi-tenant design ensures data security and isolation"
        />
        <FeatureCard
          icon={<BarChart3 className="w-12 h-12 mb-4 text-purple-400" />}
          title="Comprehensive Coverage"
          description="Access data from brokers, banks, crypto exchanges, and more"
        />
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as RefObject<Element>, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
        {icon}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

function SupportedAccountsSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Supported Accounts
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccountType title="Stock Brokerage" />
        <AccountType title="Cryptocurrency" />
        <AccountType title="Banking" />
        <AccountType title="Insurance" />
        <AccountType title="Utilities" />
        <AccountType title="Future Expansions" />
      </div>
    </section>
  );
}

function AccountType({ title }: { title: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <div className="bg-card p-4 rounded-lg text-center cursor-pointer">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </motion.div>
  );
}

function DevelopersSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">For Developers</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card p-6 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Standardized data formats across all providers</li>
            <li>Reduced development time and maintenance</li>
            <li>Comprehensive documentation and support</li>
            <li>Future SDK support for major programming languages</li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

function BusinessesSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">For Businesses</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card p-6 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Reduced integration costs</li>
            <li>Faster time to market</li>
            <li>Scalable infrastructure</li>
            <li>Real-time data access</li>
            <li>Future white-label solutions</li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

function DashboardSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Developer Dashboard
      </h2>
      <p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
        Our current dashboard serves as a developer-friendly testing environment
        for the API, eliminating the need for generic tools like Postman. It
        provides specialized interfaces for testing broker connections, data
        synchronization, and API functionality.
      </p>
      <div className="text-center">
        <Link href="/auth/signup">
          <Button size="lg">Try the Dashboard</Button>
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-card py-8">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; 2023 Synctic. All rights reserved.</p>
      </div>
    </footer>
  );
}
