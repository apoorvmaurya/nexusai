import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Workflow, Zap, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroIllustration from "@/components/landing/hero-illustration";
import FeatureCard from "@/components/landing/feature-card";
import LogoCloud from "@/components/landing/logo-cloud";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Zap className="h-5 w-5 text-primary" />
            <span>FlowAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#integrations" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Integrations
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">
                Sign up
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
        <section className="pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors bg-primary/10 text-primary mb-4">
                <span>Introducing FlowAI 1.0</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                AI-Powered Workflow Automation Platform
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mt-4">
                Combine the power of conversational AI with visual workflow automation. Build, deploy, and scale with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/auth/register">
                  <Button size="lg" className="rounded-full px-8">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Watch demo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative mt-12 md:mt-16 mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-3xl rounded-3xl -z-10" />
              <div className="relative bg-card/30 backdrop-blur-md border rounded-3xl shadow-2xl p-2 overflow-hidden">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Powerful tools to streamline your workflow and boost productivity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <FeatureCard 
                icon={<Bot className="h-10 w-10" />}
                title="AI-Powered Conversations"
                description="Intelligent assistant that understands context and can perform actions across your integrated tools."
              />
              <FeatureCard 
                icon={<Workflow className="h-10 w-10" />}
                title="Visual Workflow Builder"
                description="Drag-and-drop interface to create powerful automation workflows without code."
              />
              <FeatureCard 
                icon={<Share2 className="h-10 w-10" />}
                title="Third-Party Integrations"
                description="Connect with your favorite tools like Gmail, Slack, and Notion to automate your entire stack."
              />
            </div>
          </div>
        </section>

        {/* Integrations section */}
        <section id="integrations" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Integrations</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Connect FlowAI with your favorite tools and services.
              </p>
            </div>
            <LogoCloud />
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/10 to-purple-500/10 border backdrop-blur-sm">
              <div className="space-y-4 md:max-w-md">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your workflow?</h2>
                <p className="text-xl text-muted-foreground">
                  Start automating your tasks and boosting productivity today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="rounded-full px-8">
                    Get started for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Contact sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 md:max-w-xs">
              <div className="flex items-center gap-2 font-bold">
                <Zap className="h-5 w-5 text-primary" />
                <span>FlowAI</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered workflow automation platform for modern teams.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Contact</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/demo" className="text-sm text-muted-foreground hover:text-foreground">
                      Request Demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 FlowAI, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}