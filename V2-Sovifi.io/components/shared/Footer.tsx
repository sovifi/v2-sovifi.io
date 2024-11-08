export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sovifi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}